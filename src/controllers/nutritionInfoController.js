const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

const getNutritionInfoData = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log(`Fetching all nutrition info data for user ID: ${userId}`);

    // Calculate the start of the current day (midnight)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // This creates a valid Date object for today at 00:00:00

    // Fetch all user-related nutritional data (since the user started using the app)
    const [nutritionInfo, todayNutritionInfo] = await Promise.all([
      prismaClient.nutritionInfo.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' }, // Order by ascending date for chart and table
      }),
      prismaClient.nutritionInfo.findMany({
        where: {
          userId,
          createdAt: {
            gte: startOfDay, // Use valid Date object to filter today's data
          },
        },
        orderBy: { createdAt: 'asc' },
      }),
    ]);

    // Calculate today's totals for calories, protein, carbs, and fat
    const totalCalories = todayNutritionInfo
      .reduce((sum, log) => sum + log.calories, 0)
      .toFixed(2);

    const totalProtein = todayNutritionInfo
      .reduce((sum, log) => sum + log.protein, 0)
      .toFixed(2);

    const totalCarbs = todayNutritionInfo
      .reduce((sum, log) => sum + log.carbohydrates, 0)
      .toFixed(2);

    const totalFat = todayNutritionInfo
      .reduce((sum, log) => sum + log.fat, 0)
      .toFixed(2);

    // Aggregate nutritional info data for all time (starting from when user began using the app)
    const dailyNutritionalIntake = {
      calories: {},
      protein: {},
      carbohydrates: {},
      fat: {},
    };

    // Array to hold the table data for each day's nutritional info
    const nutritionalTableData = [];

    nutritionInfo.forEach((log) => {
      const date = new Date(log.createdAt);
      const dateString = date.toLocaleDateString(); // Format the date to string

      // Sum nutrients by date
      dailyNutritionalIntake.calories[dateString] =
        (dailyNutritionalIntake.calories[dateString] || 0) + log.calories;
      dailyNutritionalIntake.protein[dateString] =
        (dailyNutritionalIntake.protein[dateString] || 0) + log.protein;
      dailyNutritionalIntake.carbohydrates[dateString] =
        (dailyNutritionalIntake.carbohydrates[dateString] || 0) +
        log.carbohydrates;
      dailyNutritionalIntake.fat[dateString] =
        (dailyNutritionalIntake.fat[dateString] || 0) + log.fat;

      // Push to table data
      nutritionalTableData.push({
        date: dateString,
        calories: dailyNutritionalIntake.calories[dateString],
        protein: dailyNutritionalIntake.protein[dateString],
        carbohydrates: dailyNutritionalIntake.carbohydrates[dateString],
        fat: dailyNutritionalIntake.fat[dateString],
      });
    });

    // Render the nutrition info view with totals and table
    res.render('nutritionInfo', {
      title: 'Nutrition Info',
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      nutritionalTableData,
    });
  } catch (error) {
    console.error('Error fetching nutrition info data:', error.message);
    res.status(500).send('Error loading nutrition info');
  }
};

module.exports = { getNutritionInfoData };
