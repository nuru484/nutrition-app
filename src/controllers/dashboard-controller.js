const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    const [user, userConditions, userRecommendedMeals, topMeals] =
      await Promise.all([
        prismaClient.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
          },
        }),

        prismaClient.userCondition.findMany({
          where: { userId },
          include: {
            condition: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        }),

        prismaClient.recommendedMeal.findMany({
          where: {
            condition: {
              is: {
                users: {
                  some: { userId },
                },
              },
            },
          },
          include: {
            condition: {
              select: { name: true },
            },
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
          take: 3,
        }),

        prismaClient.meal.findMany({
          orderBy: { calories: "asc" },
          take: 3,
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
        }),
      ]);

    // Limit recommended meals to top 3 if more exist
    const topRecommendedMeals = userRecommendedMeals.slice(0, 3);

    console.log(`Rendering dashboard for user ID: ${userId}`);

    res.render("dashboard", {
      title: "Dashboard",
      user,
      userConditions: userConditions.map((uc) => uc.condition),
      recommendedMeals: topRecommendedMeals,
      topMeals,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error.message);
    res.status(500).send("Error loading dashboard");
  }
};

module.exports = { getDashboardData };
