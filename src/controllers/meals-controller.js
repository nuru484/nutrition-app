const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

const getMeals = async (req, res) => {
  const userId = req.user.id;

  try {
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

    res.render("meals", { meals, userId });
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).send("Error fetching meals");
  }
};

module.exports = { getMeals };
