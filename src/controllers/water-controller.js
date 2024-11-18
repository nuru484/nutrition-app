const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

// Function to fetch all water consumption records for the user
const getUserWaterConsumption = async (req, res) => {
  const userId = req.user.id; // Assume user ID comes from the session
  console.log(`Fetching water consumption records for user ID: ${userId}`);

  try {
    const waterRecords = await prismaClient.waterConsumption.findMany({
      where: { userId },
      orderBy: { recordedAt: 'desc' }, // Order by the most recent first
    });

    console.log(
      `Water consumption records fetched successfully for user ID: ${userId}`
    );
    res.render('waterConsumption', { waterRecords });
  } catch (error) {
    console.error(
      `Error fetching water consumption records for user ID: ${userId}`,
      error
    ); // Log the error
    res.status(500).send('Error fetching water consumption records');
  }
};

// Function to add a new water consumption record
const addWaterConsumption = async (req, res) => {
  const { amount } = req.body; // Get the water amount from the request body
  const userId = req.user.id; //  user ID comes from the session

  console.log(
    `Adding water consumption for user ID: ${userId}, Amount: ${amount}`
  );

  try {
    // Check if the user exists
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) {
      console.warn(`User not found for ID: ${userId}`);
      return res.status(404).send('User not found');
    }

    console.log(
      `Creating WaterConsumption for user ID: ${userId} with amount: ${amount}`
    );
    const waterConsumptionRecord = await prismaClient.waterConsumption.create({
      data: {
        user: { connect: { id: userId } }, // Connect to the user
        amount: parseFloat(amount), // Parse amount to a float
      },
    });

    console.log(`Water consumption added successfully for user ID: ${userId}`);
    res.status(201).json({
      message: 'Water consumption recorded successfully',
      waterConsumption: waterConsumptionRecord,
    });
  } catch (error) {
    console.error(
      `Error adding water consumption for user ID: ${userId}`,
      error
    );
    res.status(500).send('Error adding water consumption');
  }
};

// Function to delete a water consumption record (optional)
const deleteWaterConsumption = async (req, res) => {
  const { id } = req.params; // Get the record ID from the request parameters
  const userId = req.user.id; // user ID comes from the session

  console.log(
    `Deleting water consumption record ID: ${id} for user ID: ${userId}`
  );

  try {
    // Check if the record exists
    const waterRecord = await prismaClient.waterConsumption.findUnique({
      where: { id },
    });
    if (!waterRecord || waterRecord.userId !== userId) {
      console.warn(
        `Water consumption record not found or does not belong to user ID: ${userId}`
      );
      return res
        .status(404)
        .send('Water consumption record not found or unauthorized');
    }

    await prismaClient.waterConsumption.delete({ where: { id } }); // Delete the record
    console.log(
      `Water consumption record deleted successfully for user ID: ${userId}, Record ID: ${id}`
    );
    res
      .status(200)
      .json({ message: 'Water consumption record deleted successfully.' });
  } catch (error) {
    console.error(
      `Error deleting water consumption record ID: ${id} for user ID: ${userId}`,
      error
    ); // Log the error
    res.status(500).send('Error deleting water consumption record');
  }
};

module.exports = {
  getUserWaterConsumption,
  addWaterConsumption,
  deleteWaterConsumption,
};
