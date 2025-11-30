const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

const getConditions = async (req, res) => {
  const userId = req.user.id;
  try {
    const conditions = await prismaClient.condition.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    res.render("conditions", { conditions, userId });
  } catch (error) {
    console.error("Error fetching conditions:", error);
    res.status(500).send("Error fetching conditions");
  }
};

module.exports = { getConditions };
