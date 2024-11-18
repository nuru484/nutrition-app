const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Log that dashboard data is being fetched
    console.log(`Fetching dashboard data for user ID: ${userId}`);

    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Fetch user-related data for the last two weeks and today's metrics
    const [
      weightRecords,
      nutritionInfo,
      waterConsumption,
      exercises,
      nutritionalGoals,
      todayNutritionInfo,
      todayWaterConsumption,
    ] = await Promise.all([
      prismaClient.weightRecord.findMany({
        where: { userId, recordedAt: { gte: fourteenDaysAgo } },
        orderBy: { recordedAt: 'desc' },
      }),
      prismaClient.nutritionInfo.findMany({
        where: { userId, createdAt: { gte: fourteenDaysAgo } },
        orderBy: { createdAt: 'asc' },
      }),
      prismaClient.waterConsumption.findMany({
        where: { userId, recordedAt: { gte: fourteenDaysAgo } },
        orderBy: { recordedAt: 'desc' },
      }),
      prismaClient.userExercise.findMany({
        where: { userId, createdAt: { gte: fourteenDaysAgo } },
        include: { exercise: true },
        orderBy: { createdAt: 'desc' },
      }),
      prismaClient.userNutritionGoal.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),
      prismaClient.nutritionInfo.findMany({
        where: { userId, createdAt: { gte: startOfDay } },
        orderBy: { createdAt: 'asc' },
      }),
      prismaClient.waterConsumption.findMany({
        where: { userId, recordedAt: { gte: startOfDay } },
        orderBy: { recordedAt: 'asc' },
      }),
    ]);

    // Log calculation of today's totals
    console.log(`Calculating today's totals`);

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
    const totalWater = todayWaterConsumption
      .reduce((sum, water) => sum + water.amount, 0)
      .toFixed(2);
    const totalCaloriesBurned = exercises
      .reduce((sum, ex) => sum + (ex.exercise.caloriesBurned || 0), 0)
      .toFixed(2);

    const latestWeight = weightRecords[0];

    // Log chart data preparation
    console.log(`Preparing chart data for calorie intake and weight`);

    const calorieIntakeData = {
      labels: [],
      datasets: [
        {
          label: 'Calories Consumed',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const dailyCalorieIntake = {};
    nutritionInfo.forEach((log) => {
      const date = new Date(log.createdAt).toLocaleDateString();
      dailyCalorieIntake[date] = (dailyCalorieIntake[date] || 0) + log.calories;
    });

    for (let i = 0; i < 14; i++) {
      const currentDate = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const dateString = currentDate.toLocaleDateString();
      calorieIntakeData.labels.push(dateString);
      calorieIntakeData.datasets[0].data.push(
        dailyCalorieIntake[dateString] || 0
      );
    }

    const weightData = weightRecords.map((record) => record.weight);
    const weightChartDates = weightRecords.map((record) =>
      new Date(record.recordedAt).toLocaleDateString()
    );

    const weightChartData = {
      labels: weightChartDates,
      datasets: [
        {
          label: 'Weight',
          data: weightData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    // Render the dashboard view with the data
    console.log(`Rendering dashboard for user ID: ${userId}`);

    res.render('dashboard', {
      title: 'Dashboard',
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      totalWater,
      totalCaloriesBurned,
      latestWeight,
      calorieIntakeData,
      weightChartData,
      nutritionalGoals,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error.message);
    res.status(500).send('Error loading dashboard');
  }
};

module.exports = { getDashboardData };
