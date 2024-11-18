const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

// Fetch all meals
const getMeals = async (req, res) => {
  const userId = req.user.id;

  try {
    console.log(`Fetching all meals for user ID: ${userId}`);
    const meals = await prismaClient.meal.findMany();

    console.log('Meals fetched successfully.');
    res.render('meals', { meals, userId });
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).send('Error fetching meals');
  }
};

// Fetch meal by ID
const getMealById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    console.log(`Fetching meal details for meal ID: ${id}`);
    const meal = await prismaClient.meal.findUnique({ where: { id } });

    if (!meal) {
      console.warn(`Meal not found for ID: ${id}`);
      return res.status(404).send('Meal not found');
    }

    console.log('Meal details fetched successfully.');
    res.render('mealDetail', { meal, userId });
  } catch (error) {
    console.error('Error fetching meal details:', error);
    res.status(500).send('Error fetching meal details');
  }
};

// Add a user meal and update nutritional info
const addUserMeal = async (req, res) => {
  const { userId, mealId } = req.body;

  try {
    console.log(`Adding meal for user ID: ${userId}, meal ID: ${mealId}`);

    // Validate if user and meal exist
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    const meal = await prismaClient.meal.findUnique({ where: { id: mealId } });

    if (!user) {
      console.warn(`User not found for ID: ${userId}`);
      return res.status(404).send('User not found');
    }
    if (!meal) {
      console.warn(`Meal not found for ID: ${mealId}`);
      return res.status(404).send('Meal not found');
    }

    // Create a new UserMeal entry
    const userMeal = await prismaClient.userMeal.create({
      data: {
        user: { connect: { id: userId } },
        meal: { connect: { id: mealId } },
      },
    });

    console.log('User meal added successfully.');

    // Update user's nutritional info
    await updateNutritionalInfo(userId, meal);

    // Respond with created user meal details
    res.status(201).json({
      message: 'Meal consumed successfully',
      meal,
    });
  } catch (error) {
    console.error('Error adding user meal:', error);
    res.status(500).send('Error adding user meal');
  }
};

// Update user's nutritional info based on meal
const updateNutritionalInfo = async (userId, meal) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Fetch current day's nutritional info
    let nutritionInfo = await prismaClient.nutritionInfo.findFirst({
      where: { userId, createdAt: { gte: startOfDay } },
    });

    if (nutritionInfo) {
      // Update existing nutritional info
      nutritionInfo = await prismaClient.nutritionInfo.update({
        where: { id: nutritionInfo.id },
        data: {
          calories: nutritionInfo.calories + meal.calories,
          protein: nutritionInfo.protein + meal.protein,
          carbohydrates: nutritionInfo.carbohydrates + meal.carbohydrates,
          fat: nutritionInfo.fat + meal.fat,
        },
      });
      console.log('Nutritional info updated for today.');
    } else {
      // Create new nutritional info entry
      nutritionInfo = await prismaClient.nutritionInfo.create({
        data: {
          user: { connect: { id: userId } },
          calories: meal.calories,
          protein: meal.protein,
          carbohydrates: meal.carbohydrates,
          fat: meal.fat,
        },
      });
      console.log('New nutritional info created for today.');
    }
  } catch (error) {
    console.error('Error updating nutritional info:', error);
  }
};

// Fetch meals consumed by the user
const getUserMeals = async (req, res) => {
  const userId = req.user.id;

  try {
    console.log(`Fetching meals consumed by user ID: ${userId}`);
    const userMeals = await prismaClient.userMeal.findMany({
      where: { userId },
      include: { meal: true },
    });

    console.log('User meals fetched successfully.');
    res.render('userMeals', { userMeals });
  } catch (error) {
    console.error(`Error fetching user meals for user ID: ${userId}`, error);
    res.status(500).send('Error fetching user meals');
  }
};

module.exports = { getMeals, getMealById, addUserMeal, getUserMeals };
