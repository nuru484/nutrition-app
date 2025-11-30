const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

const getUserConditions = async (req, res) => {
  const userId = req.session.userId;

  try {
    // Get user's conditions with detailed information
    const userConditions = await prismaClient.userCondition.findMany({
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
    });

    // Get all available conditions for adding new ones
    const allConditions = await prismaClient.condition.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
      orderBy: { name: "asc" },
    });

    // Create a set of user's current condition IDs for easy checking
    const userConditionIds = userConditions.map((uc) => uc.conditionId);

    res.render("user-conditions", {
      userConditions,
      allConditions,
      userConditionIds,
      userId,
      hasConditions: userConditions.length > 0,
    });
  } catch (error) {
    console.error("Error fetching user conditions:", error);
    res.status(500).send("Error fetching user conditions");
  }
};

// Add condition to user
const addUserCondition = async (req, res) => {
  const userId = req.session.userId;
  const { conditionId } = req.body;

  if (!conditionId) {
    return res.status(400).json({
      success: false,
      message: "Condition ID is required",
    });
  }

  try {
    // Check if condition already exists for user
    const existingCondition = await prismaClient.userCondition.findUnique({
      where: {
        userId_conditionId: {
          userId,
          conditionId,
        },
      },
    });

    if (existingCondition) {
      return res.status(400).json({
        success: false,
        message: "This condition is already added to your profile",
      });
    }

    // Add the condition
    const newUserCondition = await prismaClient.userCondition.create({
      data: {
        userId,
        conditionId,
      },
      include: {
        condition: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: "Condition added successfully",
      condition: newUserCondition.condition,
    });
  } catch (error) {
    console.error("Error adding user condition:", error);
    res.status(500).json({
      success: false,
      message: "Error adding condition",
    });
  }
};

// Remove condition from user
const removeUserCondition = async (req, res) => {
  const userId = req.session.userId;
  const { conditionId } = req.params;

  if (!conditionId) {
    return res.status(400).json({
      success: false,
      message: "Condition ID is required",
    });
  }

  try {
    // Check if condition exists for user
    const existingCondition = await prismaClient.userCondition.findUnique({
      where: {
        userId_conditionId: {
          userId,
          conditionId,
        },
      },
    });

    if (!existingCondition) {
      return res.status(404).json({
        success: false,
        message: "Condition not found in your profile",
      });
    }

    // Remove the condition
    await prismaClient.userCondition.delete({
      where: {
        userId_conditionId: {
          userId,
          conditionId,
        },
      },
    });

    res.json({
      success: true,
      message: "Condition removed successfully",
    });
  } catch (error) {
    console.error("Error removing user condition:", error);
    res.status(500).json({
      success: false,
      message: "Error removing condition",
    });
  }
};

module.exports = {
  getUserConditions,
  addUserCondition,
  removeUserCondition,
};
