// prisma/seeds/recommendedMeals.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Recommended meals for each condition with reasons and scores (1-10)
const recommendedMealsData = [
  // Type 2 Diabetes - Low GI, high fiber, moderate carbs
  {
    conditionName: "Type 2 Diabetes",
    mealName: "Waakye",
    reason:
      "Combination of rice and beans provides balanced carbs with fiber that helps regulate blood sugar levels",
    score: 9,
  },
  {
    conditionName: "Type 2 Diabetes",
    mealName: "Red Red (Bean Stew with Fried Plantain)",
    reason:
      "High in fiber from beans, moderate portion of plantain provides controlled carbohydrate intake",
    score: 8,
  },
  {
    conditionName: "Type 2 Diabetes",
    mealName: "Boiled Yam with Kontomire Stew",
    reason:
      "Boiled yam has lower glycemic index than fried alternatives, kontomire adds fiber",
    score: 8,
  },
  {
    conditionName: "Type 2 Diabetes",
    mealName: "Kofi Brokeman (Plantain and Beans)",
    reason:
      "Balanced combination of complex carbs and protein from beans helps stabilize blood sugar",
    score: 8,
  },
  {
    conditionName: "Type 2 Diabetes",
    mealName: "Beans and Gari",
    reason:
      "High protein and fiber content from beans makes this excellent for blood sugar control",
    score: 9,
  },
  {
    conditionName: "Type 2 Diabetes",
    mealName: "Tom Brown (Roasted Corn Porridge)",
    reason:
      "Low glycemic index breakfast option with controlled carbohydrate portion",
    score: 7,
  },

  // Hypertension - Low sodium, high potassium, heart-healthy
  {
    conditionName: "Hypertension",
    mealName: "Fresh Fish Light Soup",
    reason:
      "Rich in omega-3 fatty acids and potassium, low in sodium when prepared without excess salt",
    score: 9,
  },
  {
    conditionName: "Hypertension",
    mealName: "Banku with Okra Stew",
    reason:
      "Okra is rich in potassium and magnesium, fermented banku is easier to digest",
    score: 8,
  },
  {
    conditionName: "Hypertension",
    mealName: "Plain Rice with Kontomire Stew",
    reason:
      "Kontomire (cocoyam leaves) provides potassium and magnesium for blood pressure regulation",
    score: 8,
  },
  {
    conditionName: "Hypertension",
    mealName: "Grilled Tilapia with Banku",
    reason:
      "Grilled fish provides heart-healthy omega-3s without added sodium from frying",
    score: 9,
  },
  {
    conditionName: "Hypertension",
    mealName: "Boiled Cocoyam with Garden Egg Stew",
    reason:
      "Cocoyam and garden eggs are potassium-rich foods that support healthy blood pressure",
    score: 8,
  },

  // Obesity - Low calorie, high protein, high fiber
  {
    conditionName: "Obesity",
    mealName: "Fresh Fish Light Soup",
    reason:
      "Low calorie, high protein meal that promotes satiety and weight management",
    score: 9,
  },
  {
    conditionName: "Obesity",
    mealName: "Banku with Tilapia and Pepper",
    reason:
      "High protein from tilapia helps with muscle maintenance during weight loss",
    score: 8,
  },
  {
    conditionName: "Obesity",
    mealName: "Boiled Yam with Kontomire Stew",
    reason:
      "Boiled preparation keeps calories lower while providing filling complex carbohydrates",
    score: 8,
  },
  {
    conditionName: "Obesity",
    mealName: "Kelewele with Roasted Groundnuts",
    reason:
      "Portion-controlled serving provides healthy fats and protein for satiety",
    score: 7,
  },
  {
    conditionName: "Obesity",
    mealName: "Tom Brown (Roasted Corn Porridge)",
    reason: "Low-calorie breakfast option that keeps you full longer",
    score: 8,
  },

  // Cardiovascular Disease - Heart-healthy fats, high fiber, omega-3s
  {
    conditionName: "Cardiovascular Disease",
    mealName: "Grilled Tilapia with Banku",
    reason:
      "Rich source of omega-3 fatty acids from tilapia supports heart health",
    score: 9,
  },
  {
    conditionName: "Cardiovascular Disease",
    mealName: "Fresh Fish Light Soup",
    reason: "Excellent source of heart-protective omega-3 fatty acids",
    score: 9,
  },
  {
    conditionName: "Cardiovascular Disease",
    mealName: "Banku with Okra Stew",
    reason: "Okra provides soluble fiber that helps lower cholesterol levels",
    score: 8,
  },
  {
    conditionName: "Cardiovascular Disease",
    mealName: "Waakye",
    reason:
      "Combination of whole grains and legumes provides heart-healthy fiber",
    score: 8,
  },

  // High Cholesterol - Soluble fiber, healthy fats, low saturated fat
  {
    conditionName: "High Cholesterol",
    mealName: "Banku with Okra Stew",
    reason:
      "Okra contains soluble fiber that helps bind and eliminate cholesterol",
    score: 9,
  },
  {
    conditionName: "High Cholesterol",
    mealName: "Red Red (Bean Stew with Fried Plantain)",
    reason: "Beans are rich in soluble fiber that lowers LDL cholesterol",
    score: 9,
  },
  {
    conditionName: "High Cholesterol",
    mealName: "Waakye",
    reason:
      "Combination of rice and beans provides soluble fiber for cholesterol management",
    score: 8,
  },
  {
    conditionName: "High Cholesterol",
    mealName: "Beans and Gari",
    reason:
      "High soluble fiber content from beans helps reduce cholesterol absorption",
    score: 9,
  },

  // GERD - Low acid, non-spicy, easy to digest
  {
    conditionName: "Gastroesophageal Reflux Disease (GERD)",
    mealName: "Omo Tuo with Groundnut Soup",
    reason: "Smooth texture and creamy consistency easy on the stomach lining",
    score: 8,
  },
  {
    conditionName: "Gastroesophageal Reflux Disease (GERD)",
    mealName: "Tom Brown (Roasted Corn Porridge)",
    reason: "Gentle on the stomach, easy to digest breakfast option",
    score: 8,
  },
  {
    conditionName: "Gastroesophageal Reflux Disease (GERD)",
    mealName: "Banku with Okra Stew",
    reason: "Okra has soothing properties for the digestive tract",
    score: 7,
  },

  // IBS - Low FODMAP, easy digesting, soluble fiber
  {
    conditionName: "Irritable Bowel Syndrome (IBS)",
    mealName: "Rice Water (Breakfast Rice Porridge)",
    reason: "Very gentle on the digestive system, easy to digest",
    score: 9,
  },
  {
    conditionName: "Irritable Bowel Syndrome (IBS)",
    mealName: "Tom Brown (Roasted Corn Porridge)",
    reason: "Well-tolerated by most IBS patients when portion controlled",
    score: 8,
  },
  {
    conditionName: "Irritable Bowel Syndrome (IBS)",
    mealName: "Plain Rice with Kontomire Stew",
    reason: "White rice is low FODMAP and easy to digest",
    score: 8,
  },

  // Osteoarthritis - Anti-inflammatory, high in omega-3s
  {
    conditionName: "Osteoarthritis",
    mealName: "Grilled Tilapia with Banku",
    reason:
      "Rich in omega-3 fatty acids which have anti-inflammatory properties",
    score: 9,
  },
  {
    conditionName: "Osteoarthritis",
    mealName: "Fresh Fish Light Soup",
    reason: "Excellent source of anti-inflammatory omega-3 fatty acids",
    score: 9,
  },
  {
    conditionName: "Osteoarthritis",
    mealName: "Banku with Okra Stew",
    reason: "Okra contains antioxidants that may reduce joint inflammation",
    score: 8,
  },

  // Asthma - Anti-inflammatory, antioxidant-rich
  {
    conditionName: "Asthma",
    mealName: "Fresh Fish Light Soup",
    reason: "Omega-3 fatty acids may help reduce airway inflammation",
    score: 8,
  },
  {
    conditionName: "Asthma",
    mealName: "Plain Rice with Kontomire Stew",
    reason:
      "Kontomire provides antioxidant vitamins that support respiratory health",
    score: 7,
  },

  // Chronic Kidney Disease - Low potassium, low phosphorus, high quality protein
  {
    conditionName: "Chronic Kidney Disease",
    mealName: "Rice Water (Breakfast Rice Porridge)",
    reason: "Very low in potassium and phosphorus, gentle on kidneys",
    score: 9,
  },
  {
    conditionName: "Chronic Kidney Disease",
    mealName: "Gari Soakings",
    reason:
      "Low potassium option when prepared without high-potassium additives",
    score: 8,
  },
  {
    conditionName: "Chronic Kidney Disease",
    mealName: "Plain Rice with Kontomire Stew",
    reason: "White rice is low in potassium; portion control of stew needed",
    score: 7,
  },

  // Hypothyroidism - Iodine-rich, selenium-rich
  {
    conditionName: "Hypothyroidism",
    mealName: "Grilled Tilapia with Banku",
    reason:
      "Fish is a good source of iodine and selenium important for thyroid function",
    score: 9,
  },
  {
    conditionName: "Hypothyroidism",
    mealName: "Fresh Fish Light Soup",
    reason:
      "Excellent source of iodine essential for thyroid hormone production",
    score: 9,
  },

  // Anemia - Iron-rich, vitamin C for absorption
  {
    conditionName: "Anemia",
    mealName: "Kontomire Nkwan",
    reason:
      "Dark leafy greens provide iron and vitamin C for better absorption",
    score: 8,
  },
  {
    conditionName: "Anemia",
    mealName: "Palaver Sauce with Boiled Yam",
    reason: "Rich in iron from leafy greens and easily digestible",
    score: 8,
  },

  // Gout - Low purine, anti-inflammatory
  {
    conditionName: "Gout",
    mealName: "Rice Water (Breakfast Rice Porridge)",
    reason: "Very low in purines, gentle on joints",
    score: 9,
  },
  {
    conditionName: "Gout",
    mealName: "Tom Brown (Roasted Corn Porridge)",
    reason: "Low purine breakfast option",
    score: 8,
  },

  // PCOS - Low GI, high fiber, balanced hormones
  {
    conditionName: "Polycystic Ovary Syndrome (PCOS)",
    mealName: "Waakye",
    reason:
      "Balanced macronutrients help with insulin sensitivity and hormone balance",
    score: 9,
  },
  {
    conditionName: "Polycystic Ovary Syndrome (PCOS)",
    mealName: "Red Red (Bean Stew with Fried Plantain)",
    reason: "High fiber content helps with insulin resistance management",
    score: 8,
  },

  // Osteoporosis - Calcium-rich, vitamin D, magnesium
  {
    conditionName: "Osteoporosis",
    mealName: "Banku with Tilapia and Pepper",
    reason: "Fish provides vitamin D and calcium for bone health",
    score: 8,
  },
  {
    conditionName: "Osteoporosis",
    mealName: "Boiled Yam with Kontomire Stew",
    reason: "Yam provides magnesium important for bone density",
    score: 7,
  },
];

async function seedRecommendedMeals() {
  console.log("Starting recommended meals seeding process...\n");

  let createdCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const recMeal of recommendedMealsData) {
    try {
      // Find condition by name
      const condition = await prisma.condition.findUnique({
        where: { name: recMeal.conditionName },
      });

      if (!condition) {
        console.log(`⚠️  Condition not found: "${recMeal.conditionName}"`);
        errorCount++;
        continue;
      }

      // Find meal by name
      const meal = await prisma.meal.findUnique({
        where: { name: recMeal.mealName },
      });

      if (!meal) {
        console.log(
          `⚠️  Meal not found: "${recMeal.mealName}" for condition "${recMeal.conditionName}"`
        );
        errorCount++;
        continue;
      }

      // Check if recommendation already exists
      const existingRecommendation = await prisma.recommendedMeal.findUnique({
        where: {
          conditionId_mealId: {
            conditionId: condition.id,
            mealId: meal.id,
          },
        },
      });

      if (existingRecommendation) {
        console.log(
          `⏭️ Skipped: ${recMeal.mealName} for ${recMeal.conditionName} (already exists)`
        );
        skippedCount++;
        continue;
      }

      // Create the recommendation
      await prisma.recommendedMeal.create({
        data: {
          conditionId: condition.id,
          mealId: meal.id,
          reason: recMeal.reason,
          score: recMeal.score,
        },
      });

      console.log(
        `✅ Created: ${recMeal.mealName} → ${recMeal.conditionName} (Score: ${recMeal.score})`
      );
      createdCount++;
    } catch (error) {
      console.error(
        `❌ Error creating recommendation for ${recMeal.mealName}:`,
        error.message
      );
      errorCount++;
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("Recommended Meals Seeding Summary:");
  console.log(`✅ Created: ${createdCount} recommendations`);
  console.log(`⏭️ Skipped: ${skippedCount} recommendations (already existed)`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(
    `📊 Total recommendations processed: ${
      createdCount + skippedCount + errorCount
    }`
  );
  console.log("=".repeat(60) + "\n");
}

async function main() {
  try {
    await seedRecommendedMeals();
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
