const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

// Fetch all weight records for a user
const getUserWeightRecords = async (req, res) => {
  const userId = req.user.id; // Assume user ID comes from the session

  console.log(`Fetching weight records for user ID: ${userId}`);

  try {
    const weightRecords = await prismaClient.weightRecord.findMany({
      where: { userId },
      orderBy: { recordedAt: 'desc' }, // Order by latest date
    });

    console.log(`Weight records fetched successfully for user ID: ${userId}`);
    res.render('weightRecords', { weightRecords });
  } catch (error) {
    console.error(
      `Error fetching weight records for user ID: ${userId}`,
      error
    );
    res.status(500).send('Error fetching weight records');
  }
};

// Add a new weight record
const addWeightRecord = async (req, res) => {
  const { weight } = req.body; // Get weight from request body
  const userId = req.user.id; // Assume user ID comes from the session

  console.log(`Adding weight record for user ID: ${userId}, Weight: ${weight}`);

  try {
    // Create a new weight record
    const newWeightRecord = await prismaClient.weightRecord.create({
      data: {
        weight: parseFloat(weight), // Convert weight to float
        user: { connect: { id: userId } }, // Associate the weight record with the user
      },
    });

    console.log(`Weight record added successfully for user ID: ${userId}`);
    res.status(201).json({
      message: 'Weight record added successfully',
      newWeightRecord,
    });
  } catch (error) {
    console.error(`Error adding weight record for user ID: ${userId}`, error);
    res.status(500).send('Error adding weight record');
  }
};

// Delete a weight record
const deleteWeightRecord = async (req, res) => {
  const { id } = req.params;

  console.log(`Deleting weight record with ID: ${id}`);

  try {
    await prismaClient.weightRecord.delete({
      where: { id },
    });

    console.log(`Weight record deleted successfully with ID: ${id}`);
    res.status(200).json({ message: 'Weight record deleted successfully.' });
  } catch (error) {
    console.error(`Error deleting weight record with ID ${id}:`, error);
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the record.' });
  }
};

module.exports = {
  getUserWeightRecords,
  addWeightRecord,
  deleteWeightRecord,
};
