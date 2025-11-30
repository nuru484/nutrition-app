// prisma/seeds/conditions.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Comprehensive list of 15 popular health conditions with descriptions
const healthConditions = [
  {
    name: "Type 2 Diabetes",
    description:
      "A chronic condition characterized by high blood sugar levels due to insulin resistance and relative insulin deficiency. Managed through diet, exercise, and medication.",
  },
  {
    name: "Hypertension",
    description:
      "High blood pressure condition that increases the risk of heart disease, stroke, and kidney problems. Often managed with lifestyle changes and medication.",
  },
  {
    name: "Obesity",
    description:
      "Medical condition involving excessive body fat accumulation that increases health risks. Associated with diabetes, heart disease, and joint problems.",
  },
  {
    name: "Cardiovascular Disease",
    description:
      "Diseases affecting the heart and blood vessels, including coronary artery disease, heart failure, and arrhythmias. Primary cause of death worldwide.",
  },
  {
    name: "High Cholesterol",
    description:
      "Elevated levels of cholesterol in the blood, particularly LDL cholesterol, which can lead to plaque buildup in arteries and increase cardiovascular risk.",
  },
  {
    name: "Gastroesophageal Reflux Disease (GERD)",
    description:
      "Chronic condition where stomach acid flows back into the esophagus, causing heartburn and potential esophageal damage.",
  },
  {
    name: "Irritable Bowel Syndrome (IBS)",
    description:
      "Common disorder affecting the large intestine, causing cramping, abdominal pain, bloating, gas, and diarrhea or constipation.",
  },
  {
    name: "Osteoarthritis",
    description:
      "Degenerative joint disease that occurs when the protective cartilage that cushions the ends of bones wears down over time.",
  },
  {
    name: "Asthma",
    description:
      "Chronic respiratory condition causing inflammation and narrowing of the airways, leading to wheezing, shortness of breath, and chest tightness.",
  },
  {
    name: "Chronic Kidney Disease",
    description:
      "Progressive loss of kidney function over time, often caused by diabetes and hypertension. Requires dietary management and monitoring.",
  },
  {
    name: "Hypothyroidism",
    description:
      "Condition where the thyroid gland doesn't produce enough thyroid hormones, leading to slowed metabolism, fatigue, and weight gain.",
  },
  {
    name: "Anemia",
    description:
      "Condition characterized by a deficiency of red blood cells or hemoglobin, leading to fatigue, weakness, and shortness of breath.",
  },
  {
    name: "Gout",
    description:
      "Form of arthritis caused by excess uric acid in the blood, leading to painful joint inflammation, particularly in the big toe.",
  },
  {
    name: "Polycystic Ovary Syndrome (PCOS)",
    description:
      "Hormonal disorder common among women of reproductive age, causing irregular periods, excess androgen levels, and polycystic ovaries.",
  },
  {
    name: "Osteoporosis",
    description:
      "Condition characterized by weakened bones with increased risk of fractures, particularly in the hip, spine, and wrist.",
  },
];

async function seedConditions() {
  console.log("Starting conditions seeding process...\n");
  let createdCount = 0;
  let skippedCount = 0;

  for (const conditionData of healthConditions) {
    try {
      const existingCondition = await prisma.condition.findUnique({
        where: { name: conditionData.name },
      });

      if (existingCondition) {
        console.log(`⏭️ Skipped: "${conditionData.name}" (already exists)`);
        skippedCount++;
        continue;
      }

      // Create the condition
      await prisma.condition.create({
        data: conditionData,
      });

      console.log(`✅ Created: "${conditionData.name}"`);
      createdCount++;
    } catch (error) {
      console.error(
        `❌ Error creating "${conditionData.name}":`,
        error.message
      );
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("Conditions Seeding Summary:");
  console.log(`✅ Created: ${createdCount} conditions`);
  console.log(`⏭️ Skipped: ${skippedCount} conditions (already existed)`);
  console.log(
    `📊 Total conditions in database: ${createdCount + skippedCount}`
  );
  console.log("=".repeat(50) + "\n");
}

async function main() {
  try {
    await seedConditions();
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
