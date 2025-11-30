const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Extensive list of Ghanaian meals with nutritional information
const ghanaianMeals = [
  // Rice dishes
  {
    name: "Jollof Rice with Chicken",
    calories: 520,
    protein: 28.5,
    carbohydrates: 65.0,
    fat: 15.2,
    description:
      "West Africa's famous one-pot rice dish cooked in a rich tomato sauce with aromatic spices, served with grilled chicken",
    photo: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26",
  },
  {
    name: "Waakye",
    calories: 450,
    protein: 18.0,
    carbohydrates: 72.0,
    fat: 10.5,
    description:
      "Rice and beans cooked together with millet leaves, served with spaghetti, gari, boiled eggs, and shito",
    photo: "https://images.unsplash.com/photo-1596040033229-a0b4c4b4058c",
  },
  {
    name: "Plain Rice with Kontomire Stew",
    calories: 380,
    protein: 12.0,
    carbohydrates: 68.0,
    fat: 8.0,
    description:
      "Steamed white rice served with kontomire (cocoyam leaves) stew cooked with fish and palm oil",
    photo: "https://images.unsplash.com/photo-1516684732162-798a0062be99",
  },
  {
    name: "Fried Rice",
    calories: 480,
    protein: 15.5,
    carbohydrates: 62.0,
    fat: 18.0,
    description:
      "Stir-fried rice with mixed vegetables, eggs, and choice of protein",
    photo: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
  },

  // Banku dishes
  {
    name: "Banku with Tilapia and Pepper",
    calories: 520,
    protein: 32.0,
    carbohydrates: 58.0,
    fat: 16.5,
    description:
      "Fermented corn and cassava dough served with grilled tilapia fish and hot pepper sauce",
    photo: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb",
  },
  {
    name: "Banku with Okra Stew",
    calories: 420,
    protein: 18.5,
    carbohydrates: 62.0,
    fat: 12.0,
    description:
      "Banku served with okra soup cooked with fish or meat in a rich palm oil base",
    photo: "https://images.unsplash.com/photo-1589648229547-ff50fb5c2d6e",
  },
  {
    name: "Banku with Grilled Chicken",
    calories: 580,
    protein: 35.0,
    carbohydrates: 60.0,
    fat: 18.5,
    description:
      "Traditional banku paired with perfectly grilled chicken and fresh pepper sauce",
    photo: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6",
  },

  // Fufu varieties
  {
    name: "Fufu with Light Soup",
    calories: 480,
    protein: 22.0,
    carbohydrates: 72.0,
    fat: 11.0,
    description:
      "Pounded cassava and plantain served with tomato-based light soup with goat meat",
    photo: "https://images.unsplash.com/photo-1547592166-23ac45744acd",
  },
  {
    name: "Fufu with Groundnut Soup",
    calories: 620,
    protein: 24.5,
    carbohydrates: 68.0,
    fat: 26.0,
    description:
      "Smooth fufu served with creamy groundnut (peanut) soup with chicken",
    photo: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
  },
  {
    name: "Fufu with Palm Nut Soup",
    calories: 580,
    protein: 20.0,
    carbohydrates: 70.0,
    fat: 22.5,
    description:
      "Traditional fufu with rich palm nut soup containing fish and crabs",
    photo: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26",
  },
  {
    name: "Fufu with Kontomire Soup",
    calories: 450,
    protein: 16.5,
    carbohydrates: 68.0,
    fat: 12.5,
    description: "Fufu served with vitamin-rich cocoyam leaves soup",
    photo: "https://images.unsplash.com/photo-1547592180-85f173990554",
  },

  // Kenkey dishes
  {
    name: "Ga Kenkey with Fried Fish and Pepper",
    calories: 480,
    protein: 28.0,
    carbohydrates: 55.0,
    fat: 16.0,
    description:
      "Fermented corn dough wrapped in corn husks, served with fried fish and shito",
    photo: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
  },
  {
    name: "Fante Kenkey with Groundnut and Fish",
    calories: 520,
    protein: 26.5,
    carbohydrates: 58.0,
    fat: 20.0,
    description:
      "Fante-style kenkey served with roasted groundnuts and grilled fish",
    photo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },

  // Yam dishes
  {
    name: "Boiled Yam with Kontomire Stew",
    calories: 420,
    protein: 14.0,
    carbohydrates: 78.0,
    fat: 8.5,
    description: "Soft boiled yam chunks served with kontomire and fish stew",
    photo: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
  {
    name: "Fried Yam with Shito and Boiled Eggs",
    calories: 480,
    protein: 16.0,
    carbohydrates: 62.0,
    fat: 18.5,
    description:
      "Crispy fried yam served with spicy black pepper sauce and boiled eggs",
    photo: "https://images.unsplash.com/photo-1598511726623-d2e9996892f0",
  },
  {
    name: "Yam Porridge (Mpotompoto)",
    calories: 380,
    protein: 12.5,
    carbohydrates: 68.0,
    fat: 8.0,
    description: "Mashed yam cooked with tomatoes, onions, and palm oil",
    photo: "https://images.unsplash.com/photo-1553909489-cd47e0907980",
  },
  {
    name: "Yam Chips with Grilled Chicken",
    calories: 550,
    protein: 32.0,
    carbohydrates: 58.0,
    fat: 20.0,
    description:
      "Crispy yam chips served with grilled chicken and pepper sauce",
    photo: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
  },

  // Plantain dishes
  {
    name: "Kelewele with Roasted Groundnuts",
    calories: 320,
    protein: 8.5,
    carbohydrates: 52.0,
    fat: 11.0,
    description: "Spiced fried ripe plantain cubes served with roasted peanuts",
    photo: "https://images.unsplash.com/photo-1587334207828-4f0c0c5e2e89",
  },
  {
    name: "Tatale (Plantain Pancakes)",
    calories: 280,
    protein: 6.0,
    carbohydrates: 48.0,
    fat: 8.5,
    description:
      "Sweet and spicy plantain fritters made with ginger and pepper",
    photo: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd",
  },
  {
    name: "Red Red (Bean Stew with Fried Plantain)",
    calories: 480,
    protein: 15.5,
    carbohydrates: 68.0,
    fat: 16.0,
    description:
      "Black-eyed peas stewed in palm oil served with fried ripe plantain",
    photo: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
  },
  {
    name: "Kofi Brokeman (Plantain and Beans)",
    calories: 420,
    protein: 14.0,
    carbohydrates: 72.0,
    fat: 9.5,
    description: "Unripe plantain and beans cooked together with palm oil",
    photo: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
  },

  // Soups and stews
  {
    name: "Goat Light Soup with Yam",
    calories: 520,
    protein: 28.0,
    carbohydrates: 62.0,
    fat: 14.5,
    description:
      "Spicy tomato-based soup with goat meat, served with boiled yam",
    photo: "https://images.unsplash.com/photo-1547592166-23ac45744acd",
  },
  {
    name: "Chicken Groundnut Soup with Rice Balls",
    calories: 640,
    protein: 26.0,
    carbohydrates: 72.0,
    fat: 24.5,
    description:
      "Creamy peanut soup with chicken, served with omo tuo (rice balls)",
    photo: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb",
  },
  {
    name: "Beef Palmnut Soup with Fufu",
    calories: 620,
    protein: 24.5,
    carbohydrates: 68.0,
    fat: 24.0,
    description: "Rich palm fruit soup with beef, crabs, and snails",
    photo: "https://images.unsplash.com/photo-1547592166-23ac45744acd",
  },
  {
    name: "Fresh Fish Light Soup",
    calories: 380,
    protein: 32.0,
    carbohydrates: 42.0,
    fat: 8.5,
    description: "Light tomato soup with fresh fish and vegetables",
    photo: "https://images.unsplash.com/photo-1589648229547-ff50fb5c2d6e",
  },

  // Porridges
  {
    name: "Tom Brown (Roasted Corn Porridge)",
    calories: 220,
    protein: 6.5,
    carbohydrates: 42.0,
    fat: 4.0,
    description:
      "Nutritious roasted corn porridge with groundnut paste and milk",
    photo: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a",
  },
  {
    name: "Hausa Koko with Koose",
    calories: 380,
    protein: 12.0,
    carbohydrates: 58.0,
    fat: 11.5,
    description: "Spiced millet porridge served with bean fritters",
    photo: "https://images.unsplash.com/photo-1584007589780-fce75ba5bc2d",
  },
  {
    name: "Koko with Bread",
    calories: 320,
    protein: 8.0,
    carbohydrates: 62.0,
    fat: 6.5,
    description:
      "Traditional millet or corn porridge served with buttered bread",
    photo: "https://images.unsplash.com/photo-1549931319-a545dcf3bc3c",
  },
  {
    name: "Rice Water (Breakfast Rice Porridge)",
    calories: 180,
    protein: 4.5,
    carbohydrates: 38.0,
    fat: 2.0,
    description: "Light rice porridge with ginger and sugar or milk",
    photo: "https://images.unsplash.com/photo-1553909489-cd47e0907980",
  },

  // Tuo Zaafi and Northern dishes
  {
    name: "Tuo Zaafi with Ayoyo Soup",
    calories: 420,
    protein: 18.0,
    carbohydrates: 72.0,
    fat: 8.5,
    description:
      "Northern Ghana staple made from corn dough served with ayoyo (jute) leaves soup",
    photo: "https://images.unsplash.com/photo-1547592166-23ac45744acd",
  },
  {
    name: "Tubani with Groundnut Soup",
    calories: 580,
    protein: 20.5,
    carbohydrates: 78.0,
    fat: 19.0,
    description: "Millet or corn dough served with groundnut soup and meat",
    photo: "https://images.unsplash.com/photo-1589648229547-ff50fb5c2d6e",
  },

  // Ampesi and boiled dishes
  {
    name: "Ampesi (Boiled Plantain with Kontomire)",
    calories: 380,
    protein: 12.0,
    carbohydrates: 68.0,
    fat: 8.5,
    description:
      "Boiled plantain and cocoyam served with kontomire stew and fish",
    photo: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
  {
    name: "Boiled Cocoyam with Garden Egg Stew",
    calories: 350,
    protein: 10.5,
    carbohydrates: 65.0,
    fat: 8.0,
    description: "Soft boiled cocoyam with garden egg and tomato stew",
    photo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },

  // Stews and sauces
  {
    name: "Chicken Stew with Boiled Rice",
    calories: 520,
    protein: 32.0,
    carbohydrates: 62.0,
    fat: 14.5,
    description: "Rich tomato stew with chicken pieces served over white rice",
    photo: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6",
  },
  {
    name: "Fish Stew with Gari and Avocado",
    calories: 480,
    protein: 24.0,
    carbohydrates: 52.0,
    fat: 18.5,
    description: "Spicy fish stew served with gari and fresh avocado",
    photo: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
  },
  {
    name: "Garden Egg Stew with Boiled Yam",
    calories: 380,
    protein: 14.5,
    carbohydrates: 65.0,
    fat: 9.0,
    description: "Eggplant and tomato stew with dried fish, served with yam",
    photo: "https://images.unsplash.com/photo-1553909489-cd47e0907980",
  },

  // Omo Tuo (Rice Balls)
  {
    name: "Omo Tuo with Groundnut Soup",
    calories: 620,
    protein: 22.5,
    carbohydrates: 82.0,
    fat: 21.0,
    description: "Rice balls served in creamy groundnut soup with meat",
    photo: "https://images.unsplash.com/photo-1547592166-23ac45744acd",
  },
  {
    name: "Omo Tuo with Palm Nut Soup",
    calories: 640,
    protein: 20.0,
    carbohydrates: 80.0,
    fat: 24.5,
    description: "Rice balls served with rich palm nut soup",
    photo: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb",
  },

  // Gari dishes
  {
    name: "Gari Soakings",
    calories: 280,
    protein: 6.0,
    carbohydrates: 58.0,
    fat: 4.5,
    description: "Gari soaked in cold water with sugar, milk, and groundnut",
    photo: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a",
  },
  {
    name: "Gari Foto",
    calories: 420,
    protein: 14.5,
    carbohydrates: 62.0,
    fat: 12.0,
    description: "Gari fried with eggs, vegetables, and fish or corned beef",
    photo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },

  // Grilled and roasted
  {
    name: "Grilled Tilapia with Banku",
    calories: 520,
    protein: 38.0,
    carbohydrates: 52.0,
    fat: 14.5,
    description:
      "Whole tilapia grilled with spices, served with banku and pepper",
    photo: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
  },
  {
    name: "Chichinga (Kebabs) with Fried Yam",
    calories: 580,
    protein: 28.5,
    carbohydrates: 52.0,
    fat: 26.0,
    description: "Spicy grilled meat skewers served with fried yam and pepper",
    photo: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
  },
  {
    name: "Roasted Plantain with Groundnut",
    calories: 320,
    protein: 9.5,
    carbohydrates: 52.0,
    fat: 10.0,
    description: "Roasted ripe plantain served with roasted groundnuts",
    photo: "https://images.unsplash.com/photo-1587334207828-4f0c0c5e2e89",
  },

  // Additional varieties
  {
    name: "Okro Stew with Banku",
    calories: 420,
    protein: 16.5,
    carbohydrates: 62.0,
    fat: 11.5,
    description: "Okra soup with fish or crab, served with banku",
    photo: "https://images.unsplash.com/photo-1589648229547-ff50fb5c2d6e",
  },
  {
    name: "Palaver Sauce with Boiled Yam",
    calories: 400,
    protein: 15.0,
    carbohydrates: 62.0,
    fat: 11.0,
    description: "Spinach or cocoyam leaves cooked with fish and palm oil",
    photo: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
  {
    name: "Nkontomire Nkwan",
    calories: 380,
    protein: 18.5,
    carbohydrates: 48.0,
    fat: 12.5,
    description: "Kontomire soup with smoked fish and mushrooms",
    photo: "https://images.unsplash.com/photo-1547592166-23ac45744acd",
  },
  {
    name: "Abom (Fried Green Plantain with Palm Oil)",
    calories: 420,
    protein: 8.0,
    carbohydrates: 58.0,
    fat: 18.5,
    description: "Mashed green plantain mixed with palm oil and spices",
    photo: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
  },
  {
    name: "Fante Fante (Fish and Tomato)",
    calories: 380,
    protein: 28.0,
    carbohydrates: 38.0,
    fat: 12.0,
    description: "Fish cooked in tomato sauce with onions and peppers",
    photo: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
  },
  {
    name: "Tuozafi with Okro Soup",
    calories: 400,
    protein: 16.0,
    carbohydrates: 68.0,
    fat: 9.5,
    description: "Northern Ghana corn dough with okra soup and fish",
    photo: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb",
  },
  {
    name: "Boiled Cassava with Fish Stew",
    calories: 420,
    protein: 22.0,
    carbohydrates: 65.0,
    fat: 10.5,
    description: "Soft boiled cassava served with spicy fish stew",
    photo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },
  {
    name: "Konkonte with Groundnut Soup",
    calories: 520,
    protein: 18.5,
    carbohydrates: 75.0,
    fat: 16.0,
    description: "Dried cassava dough served with groundnut soup",
    photo: "https://images.unsplash.com/photo-1547592166-23ac45744acd",
  },
  {
    name: "Etor (Mashed Yam with Eggs)",
    calories: 480,
    protein: 16.5,
    carbohydrates: 68.0,
    fat: 15.5,
    description: "Mashed yam mixed with palm oil and boiled eggs",
    photo: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
  {
    name: "Yakeyake (Spicy Grilled Meat)",
    calories: 420,
    protein: 32.0,
    carbohydrates: 18.0,
    fat: 24.5,
    description: "Spicy grilled meat marinated in African spices",
    photo: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
  },
  {
    name: "Beans and Gari",
    calories: 420,
    protein: 16.5,
    carbohydrates: 68.0,
    fat: 9.5,
    description: "Black-eyed peas served with gari and palm oil",
    photo: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
  },
  {
    name: "Akple with Okro Soup",
    calories: 400,
    protein: 14.5,
    carbohydrates: 72.0,
    fat: 8.5,
    description: "Corn dough from the Volta region served with okra soup",
    photo: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb",
  },
];

async function seedMeals() {
  console.log("Starting meal seeding process...\n");

  let createdCount = 0;
  let skippedCount = 0;

  for (const mealData of ghanaianMeals) {
    try {
      const existingMeal = await prisma.meal.findUnique({
        where: { name: mealData.name },
      });

      if (existingMeal) {
        console.log(`⏭️  Skipped: "${mealData.name}" (already exists)`);
        skippedCount++;
        continue;
      }

      // Create the meal
      await prisma.meal.create({
        data: mealData,
      });

      console.log(`✅ Created: "${mealData.name}"`);
      createdCount++;
    } catch (error) {
      console.error(`❌ Error creating "${mealData.name}":`, error.message);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("Seeding Summary:");
  console.log(`✅ Created: ${createdCount} meals`);
  console.log(`⏭️  Skipped: ${skippedCount} meals (already existed)`);
  console.log(`📊 Total meals in database: ${createdCount + skippedCount}`);
  console.log("=".repeat(50) + "\n");
}

async function main() {
  try {
    await seedMeals();
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
