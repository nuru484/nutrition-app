const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

// Fetch all nutrition goals for the user
const getUserNutritionGoals = async (req, res) => {
  const userId = req.user.id;

  try {
    console.log(`Fetching nutrition goals for user ID: ${userId}`);
    const nutritionGoals = await prismaClient.userNutritionGoal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }, // Fetch goals in descending order of creation
    });

    console.log('Nutrition goals fetched successfully.');
    res.render('nutritionGoals', { nutritionGoals });
  } catch (error) {
    console.error(
      `Error fetching nutrition goals for user ID: ${userId}`,
      error
    );
    res.status(500).send('Error fetching nutrition goals');
  }
};

// Add a new nutrition goal
const addNutritionGoal = async (req, res) => {
  const { nutrientType, goalAmount } = req.body;
  const userId = req.user.id;

  try {
    console.log(`Adding nutrition goal for user ID: ${userId}`);

    // Create a new nutrition goal for the user
    const newNutritionGoal = await prismaClient.userNutritionGoal.create({
      data: {
        nutrientType,
        goalAmount: parseFloat(goalAmount), // Ensure goalAmount is stored as a float
        user: { connect: { id: userId } },
      },
    });

    console.log('Nutrition goal added successfully.');
    res.status(201).json({
      message: 'Nutrition goal added successfully',
      newNutritionGoal,
    });
  } catch (error) {
    console.error(`Error adding nutrition goal for user ID: ${userId}`, error);
    res.status(500).send('Error adding nutrition goal');
  }
};

// Delete a nutrition goal
const deleteNutritionGoal = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Deleting nutrition goal with ID: ${id}`);
    await prismaClient.userNutritionGoal.delete({
      where: { id },
    });

    console.log('Nutrition goal deleted successfully.');
    res.status(200).json({ message: 'Nutrition goal deleted successfully.' });
  } catch (error) {
    console.error(`Error deleting nutrition goal with ID: ${id}`, error);
    res.status(500).json({ error: 'Error deleting nutrition goal' });
  }
};

module.exports = {
  getUserNutritionGoals,
  addNutritionGoal,
  deleteNutritionGoal,
};
