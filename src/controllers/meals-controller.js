const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

const getMeals = async (req, res) => {
  const userId = req.user.id;

  try {
    console.log(`Fetching all meals for user ID: ${userId}`);

    const meals = await prismaClient.meal.findMany({
      select: {
        id: true,
        name: true,
        calories: true,
        protein: true,
        carbohydrates: true,
        fat: true,
        photo: true,
        description: true,
      },
    });

    console.log(`Fetched ${meals.length} meals successfully.`);
    res.render("meals", { meals, userId });
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).send("Error fetching meals");
  }
};

module.exports = { getMeals };
