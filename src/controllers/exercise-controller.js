const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();
const { subDays, startOfDay, endOfDay } = require('date-fns'); // Handle date manipulations

// Fetch all exercises
const getExercises = async (req, res) => {
  try {
    console.log('Fetching all exercises...');
    const exercises = await prismaClient.exercise.findMany();

    console.log('Exercises fetched successfully.');
    res.render('exercises', { exercises });
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).send('Error fetching exercises');
  }
};

// Fetch all exercises completed by the user
const getUserExercises = async (req, res) => {
  const userId = req.user.id;
  console.log(`Fetching exercises for user ID: ${userId}`);

  try {
    const userExercises = await prismaClient.userExercise.findMany({
      where: { userId },
      include: { exercise: true }, // Include exercise details
    });

    console.log(`User exercises fetched successfully for user ID: ${userId}`);
    res.render('userExercises', { userExercises });
  } catch (error) {
    console.error(
      `Error fetching user exercises for user ID: ${userId}`,
      error
    );
    res.status(500).send('Error fetching user exercises');
  }
};

// Add a user exercise and adjust nutrition info accordingly
const addUserExercise = async (req, res) => {
  const { exerciseId, duration } = req.body;
  const userId = req.user.id;

  console.log(
    `Adding exercise for user ID: ${userId}, Exercise ID: ${exerciseId}, Duration: ${duration} minutes`
  );

  try {
    // Check if user exists
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) {
      console.warn(`User not found for ID: ${userId}`);
      return res.status(404).send('User not found');
    }

    // Check if exercise exists
    const exercise = await prismaClient.exercise.findUnique({
      where: { id: exerciseId },
    });
    if (!exercise) {
      console.warn(`Exercise not found for ID: ${exerciseId}`);
      return res.status(404).send('Exercise not found');
    }

    // Calculate calories burned
    const caloriesBurned = (exercise.caloriesPerMinute || 0) * duration;
    console.log(`Calories burned calculated: ${caloriesBurned}`);

    // Create UserExercise entry
    console.log(
      `Creating UserExercise for user ID: ${userId} and exercise ID: ${exerciseId}`
    );
    const userExercise = await prismaClient.userExercise.create({
      data: {
        user: { connect: { id: userId } },
        exercise: { connect: { id: exerciseId } },
        duration: parseInt(duration, 10),
        caloriesBurned: caloriesBurned,
      },
    });

    console.log(`User exercise added successfully for user ID: ${userId}`);

    // Update today's NutritionInfo by subtracting calories burned
    let caloriesToSubtract = caloriesBurned;
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    // Check if today's NutritionInfo exists
    let nutritionInfo = await prismaClient.nutritionInfo.findFirst({
      where: {
        userId,
        createdAt: { gte: todayStart, lte: todayEnd },
      },
    });

    if (nutritionInfo) {
      console.log(`Found today's NutritionInfo for user ID: ${userId}`);
      caloriesToSubtract = await subtractCaloriesFromNutritionInfo(
        nutritionInfo,
        caloriesToSubtract
      );
    } else {
      console.warn(`No NutritionInfo found for today for user ID: ${userId}`);
    }

    // Handle remaining calories subtraction for previous days, if any
    let daysBack = 1;
    while (caloriesToSubtract > 0) {
      const previousDay = subDays(todayStart, daysBack);
      const previousDayEnd = endOfDay(previousDay);

      let previousNutritionInfo = await prismaClient.nutritionInfo.findFirst({
        where: {
          userId,
          createdAt: { gte: previousDay, lte: previousDayEnd },
        },
      });

      if (!previousNutritionInfo) {
        console.warn(
          `No NutritionInfo found for ${previousDay} for user ID: ${userId}, stopping calorie subtraction.`
        );
        break;
      }

      console.log(
        `Found NutritionInfo for ${previousDay} for user ID: ${userId}`
      );
      caloriesToSubtract = await subtractCaloriesFromNutritionInfo(
        previousNutritionInfo,
        caloriesToSubtract
      );

      daysBack += 1;
    }

    // Send back exercise details in the response
    res.status(201).json({
      message: 'Exercise completed and nutritional info updated successfully',
      userExercise: {
        id: userExercise.id,
        duration: userExercise.duration,
        caloriesBurned: caloriesBurned,
        exerciseName: exercise.name,
      },
    });
  } catch (error) {
    console.error(`Error adding user exercise for user ID: ${userId}`, error);
    res.status(500).send('Error adding user exercise');
  }
};

// Subtract calories from NutritionInfo and update the record
const subtractCaloriesFromNutritionInfo = async (
  nutritionInfo,
  caloriesToSubtract
) => {
  let newCalories = nutritionInfo.calories - caloriesToSubtract;
  let remainingCalories = 0;

  if (newCalories < 0) {
    remainingCalories = Math.abs(newCalories); // Carry over remaining calories to subtract from previous day
    newCalories = 0;
  }

  const nutrientsToSubtract = Math.floor(Math.random() * 5);

  let newProtein = nutritionInfo.protein - nutrientsToSubtract;
  let newCarbohydrates = nutritionInfo.carbohydrates - nutrientsToSubtract;
  let newFat = nutritionInfo.fat - nutrientsToSubtract;

  // Update the NutritionInfo entry with new calorie count
  await prismaClient.nutritionInfo.update({
    where: { id: nutritionInfo.id },
    data: {
      calories: newCalories,
      protein: newProtein,
      carbohydrates: newCarbohydrates,
      fat: newFat,
    },
  });

  console.log(
    `Updated NutritionInfo for date ${nutritionInfo.createdAt}: new calorie count: ${newCalories}`
  );

  return remainingCalories; // Return any remaining calories to be subtracted from previous days
};

module.exports = { getExercises, getUserExercises, addUserExercise };
