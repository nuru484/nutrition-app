const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

const getRecommendedMeals = async (req, res) => {
  const userId = req.session.userId;

  try {
    // Get user's conditions
    const userConditions = await prismaClient.userCondition.findMany({
      where: { userId },
      include: {
        condition: {
          include: {
            recommendedMeals: {
              include: {
                meal: {
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
                },
              },
              orderBy: { score: "desc" },
            },
          },
        },
      },
    });

    if (userConditions.length === 0) {
      return res.render("recommended-meals", {
        recommendedMeals: [],
        userId,
        noConditions: true,
      });
    }

    // Flatten and deduplicate recommended meals
    const allRecommendedMeals = [];
    const seenMealIds = new Set();

    userConditions.forEach((userCondition) => {
      userCondition.condition.recommendedMeals.forEach((recommendedMeal) => {
        if (!seenMealIds.has(recommendedMeal.mealId)) {
          seenMealIds.add(recommendedMeal.mealId);
          allRecommendedMeals.push({
            ...recommendedMeal.meal,
            recommendation: {
              reason: recommendedMeal.reason,
              score: recommendedMeal.score,
              conditionName: userCondition.condition.name,
            },
          });
        }
      });
    });

    // Sort by score descending
    allRecommendedMeals.sort(
      (a, b) => (b.recommendation?.score || 0) - (a.recommendation?.score || 0)
    );

    res.render("recommended-meals", {
      recommendedMeals: allRecommendedMeals,
      userId,
      userConditions: userConditions.map((uc) => uc.condition.name),
      noConditions: false,
    });
  } catch (error) {
    console.error("Error fetching recommended meals:", error);
    res.status(500).send("Error fetching recommended meals");
  }
};

module.exports = { getRecommendedMeals };
