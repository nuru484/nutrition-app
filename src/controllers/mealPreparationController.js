const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

// Get meal preparation details by meal ID
const getMealPreparation = async (req, res) => {
  const { mealId } = req.params;
  const userId = req.user.id;

  try {
    console.log(`Fetching preparation details for meal ID: ${mealId}`);

    // Fetch meal and its preparation details
    const mealWithPrep = await prismaClient.meal.findUnique({
      where: { id: mealId },
      include: {
        MealPreparation: {
          include: {
            steps: {
              orderBy: {
                stepNumber: 'asc',
              },
            },
            ingredients: true,
            equipment: true,
          },
        },
      },
    });

    if (!mealWithPrep) {
      console.warn(`Meal not found for ID: ${mealId}`);
      return res.status(404).send('Meal not found');
    }

    if (!mealWithPrep.MealPreparation) {
      console.warn(`Preparation details not found for meal ID: ${mealId}`);
      return res.status(404).send('Preparation details not found');
    }

    // Calculate total preparation time
    const totalPrepTime = mealWithPrep.MealPreparation.timeToMake;

    // Format preparation details for view
    const prepDetails = {
      meal: {
        name: mealWithPrep.name,
        photo: mealWithPrep.photo,
        description: mealWithPrep.description,
      },
      preparation: {
        timeToMake: totalPrepTime,
        difficulty: mealWithPrep.MealPreparation.difficulty,
        servings: mealWithPrep.MealPreparation.servings,
      },
      steps: mealWithPrep.MealPreparation.steps,
      ingredients: mealWithPrep.MealPreparation.ingredients,
      equipment: mealWithPrep.MealPreparation.equipment.sort((a, b) => {
        // Sort required equipment first
        if (a.optional === b.optional) return 0;
        return a.optional ? 1 : -1;
      }),
    };

    console.log('Meal preparation details fetched successfully.');
    res.render('mealPreparation', {
      title: `How to Prepare ${mealWithPrep.name}`,
      prepDetails,
      userId,
    });
  } catch (error) {
    console.error('Error fetching meal preparation details:', error);
    res.status(500).send('Error fetching meal preparation details');
  }
};

// Add new meal preparation details
const addMealPreparation = async (req, res) => {
  const { mealId } = req.params;
  const { timeToMake, difficulty, servings, steps, ingredients, equipment } =
    req.body;

  try {
    console.log(`Adding preparation details for meal ID: ${mealId}`);

    // Check if meal exists
    const meal = await prismaClient.meal.findUnique({
      where: { id: mealId },
    });

    if (!meal) {
      return res.status(404).send('Meal not found');
    }

    // Create meal preparation with nested creates
    const mealPrep = await prismaClient.mealPreparation.create({
      data: {
        meal: { connect: { id: mealId } },
        timeToMake,
        difficulty,
        servings,
        steps: {
          create: steps.map((step, index) => ({
            stepNumber: index + 1,
            description: step.description,
            timeInMinutes: step.timeInMinutes,
          })),
        },
        ingredients: {
          create: ingredients.map((ing) => ({
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
          })),
        },
        equipment: {
          create: equipment.map((eq) => ({
            name: eq.name,
            optional: eq.optional || false,
          })),
        },
      },
      include: {
        steps: true,
        ingredients: true,
        equipment: true,
      },
    });

    console.log('Meal preparation details added successfully.');
    res.status(201).json({
      message: 'Meal preparation details added successfully',
      mealPrep,
    });
  } catch (error) {
    console.error('Error adding meal preparation details:', error);
    res.status(500).send('Error adding meal preparation details');
  }
};

// Update meal preparation details
const updateMealPreparation = async (req, res) => {
  const { mealId } = req.params;
  const { timeToMake, difficulty, servings, steps, ingredients, equipment } =
    req.body;

  try {
    console.log(`Updating preparation details for meal ID: ${mealId}`);

    // Find existing meal preparation
    const existingPrep = await prismaClient.mealPreparation.findUnique({
      where: { mealId },
    });

    if (!existingPrep) {
      return res.status(404).send('Meal preparation details not found');
    }

    // Update meal preparation with transaction
    const updatedPrep = await prismaClient.$transaction(async (prisma) => {
      // Delete existing related records
      await Promise.all([
        prisma.prepStep.deleteMany({
          where: { mealPrepId: existingPrep.id },
        }),
        prisma.prepIngredient.deleteMany({
          where: { mealPrepId: existingPrep.id },
        }),
        prisma.prepEquipment.deleteMany({
          where: { mealPrepId: existingPrep.id },
        }),
      ]);

      // Update preparation with new data
      return prisma.mealPreparation.update({
        where: { id: existingPrep.id },
        data: {
          timeToMake,
          difficulty,
          servings,
          steps: {
            create: steps.map((step, index) => ({
              stepNumber: index + 1,
              description: step.description,
              timeInMinutes: step.timeInMinutes,
            })),
          },
          ingredients: {
            create: ingredients.map((ing) => ({
              name: ing.name,
              amount: ing.amount,
              unit: ing.unit,
            })),
          },
          equipment: {
            create: equipment.map((eq) => ({
              name: eq.name,
              optional: eq.optional || false,
            })),
          },
        },
        include: {
          steps: true,
          ingredients: true,
          equipment: true,
        },
      });
    });

    console.log('Meal preparation details updated successfully.');
    res.json({
      message: 'Meal preparation details updated successfully',
      mealPrep: updatedPrep,
    });
  } catch (error) {
    console.error('Error updating meal preparation details:', error);
    res.status(500).send('Error updating meal preparation details');
  }
};

module.exports = {
  getMealPreparation,
  addMealPreparation,
  updateMealPreparation,
};
