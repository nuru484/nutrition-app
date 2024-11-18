const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createMealPreparationAll() {
  const mealPreparation = await prisma.mealPreparation.findFirst();

  if (!mealPreparation) {
    await prisma.mealPreparation.create({
      data: {
        mealId: '1', // Tuo Zaafi
        timeToMake: 90,
        difficulty: 'Medium',
        servings: 4,
        steps: {
          create: [
            {
              stepNumber: 1,
              description: 'Boil water in a large pot',
              timeInMinutes: 5,
            },
            {
              stepNumber: 2,
              description: 'Mix corn flour with water to form a smooth paste',
              timeInMinutes: 5,
            },
            {
              stepNumber: 3,
              description:
                'Add the paste to boiling water while stirring continuously',
              timeInMinutes: 15,
            },
            {
              stepNumber: 4,
              description: 'Keep stirring until it becomes thick and smooth',
              timeInMinutes: 30,
            },
            {
              stepNumber: 5,
              description:
                'Add more flour and continue stirring until it reaches desired consistency',
              timeInMinutes: 35,
            },
          ],
        },
        ingredients: {
          create: [
            {
              name: 'Corn flour',
              amount: 500,
              unit: 'grams',
            },
            {
              name: 'Water',
              amount: 1000,
              unit: 'ml',
            },
            {
              name: 'Salt',
              amount: 1,
              unit: 'teaspoon',
            },
          ],
        },
        equipment: {
          create: [
            {
              name: 'Large pot',
              optional: false,
            },
            {
              name: 'Wooden spoon',
              optional: false,
            },
            {
              name: 'Measuring cups',
              optional: false,
            },
          ],
        },
      },
    });

    await prisma.mealPreparation.create({
      data: {
        mealId: '2', // Wasawasa
        timeToMake: 45,
        difficulty: 'Medium',
        servings: 4,
        steps: {
          create: [
            {
              stepNumber: 1,
              description: 'Sieve yam flour to remove lumps',
              timeInMinutes: 5,
            },
            {
              stepNumber: 2,
              description: 'Set up steamer with water at the bottom',
              timeInMinutes: 5,
            },
            {
              stepNumber: 3,
              description:
                'Mix yam flour with a little water to form small balls',
              timeInMinutes: 15,
            },
            {
              stepNumber: 4,
              description: 'Steam the balls for about 20 minutes',
              timeInMinutes: 20,
            },
          ],
        },
        ingredients: {
          create: [
            {
              name: 'Yam flour',
              amount: 400,
              unit: 'grams',
            },
            {
              name: 'Water',
              amount: 500,
              unit: 'ml',
            },
            {
              name: 'Shea oil',
              amount: 30,
              unit: 'ml',
            },
          ],
        },
        equipment: {
          create: [
            {
              name: 'Steamer',
              optional: false,
            },
            {
              name: 'Sieve',
              optional: false,
            },
            {
              name: 'Mixing bowl',
              optional: false,
            },
          ],
        },
      },
    });

    await prisma.mealPreparation.create({
      data: {
        mealId: '3', // Tubani
        timeToMake: 60,
        difficulty: 'Medium',
        servings: 6,
        steps: {
          create: [
            {
              stepNumber: 1,
              description: 'Soak cowpeas overnight and remove the skins',
              timeInMinutes: 10,
            },
            {
              stepNumber: 2,
              description: 'Grind the beans into a smooth paste',
              timeInMinutes: 15,
            },
            {
              stepNumber: 3,
              description: 'Season the paste with salt and spices',
              timeInMinutes: 5,
            },
            {
              stepNumber: 4,
              description: 'Wrap portions in banana leaves',
              timeInMinutes: 15,
            },
            {
              stepNumber: 5,
              description: 'Steam for 25 minutes',
              timeInMinutes: 25,
            },
          ],
        },
        ingredients: {
          create: [
            {
              name: 'Cowpeas',
              amount: 500,
              unit: 'grams',
            },
            {
              name: 'Salt',
              amount: 1,
              unit: 'teaspoon',
            },
            {
              name: 'Pepper',
              amount: 0.5,
              unit: 'teaspoon',
            },
            {
              name: 'Banana leaves',
              amount: 6,
              unit: 'pieces',
            },
          ],
        },
        equipment: {
          create: [
            {
              name: 'Grinder',
              optional: false,
            },
            {
              name: 'Steamer',
              optional: false,
            },
            {
              name: 'Mixing bowl',
              optional: false,
            },
          ],
        },
      },
    });

    await prisma.mealPreparation.create({
      data: {
        mealId: '4', // Zomkom
        timeToMake: 30,
        difficulty: 'Easy',
        servings: 4,
        steps: {
          create: [
            {
              stepNumber: 1,
              description:
                'Mix millet flour with cold water to form a smooth paste',
              timeInMinutes: 5,
            },
            {
              stepNumber: 2,
              description: 'Boil water in a pot',
              timeInMinutes: 5,
            },
            {
              stepNumber: 3,
              description: 'Add the paste to boiling water while stirring',
              timeInMinutes: 10,
            },
            {
              stepNumber: 4,
              description: 'Cook until thickened, then let it cool',
              timeInMinutes: 10,
            },
          ],
        },
        ingredients: {
          create: [
            {
              name: 'Millet flour',
              amount: 200,
              unit: 'grams',
            },
            {
              name: 'Water',
              amount: 1000,
              unit: 'ml',
            },
            {
              name: 'Sugar',
              amount: 50,
              unit: 'grams',
            },
          ],
        },
        equipment: {
          create: [
            {
              name: 'Pot',
              optional: false,
            },
            {
              name: 'Wooden spoon',
              optional: false,
            },
            {
              name: 'Serving bowl',
              optional: true,
            },
          ],
        },
      },
    });

    await prisma.mealPreparation.create({
      data: {
        mealId: '7', // Fufu with Groundnut Soup
        timeToMake: 120,
        difficulty: 'Hard',
        servings: 6,
        steps: {
          create: [
            {
              stepNumber: 1,
              description: 'Peel and cut yams into chunks',
              timeInMinutes: 15,
            },
            {
              stepNumber: 2,
              description: 'Boil yams until soft',
              timeInMinutes: 25,
            },
            {
              stepNumber: 3,
              description: 'Pound yams until smooth and elastic',
              timeInMinutes: 20,
            },
            {
              stepNumber: 4,
              description:
                'Prepare groundnut paste by grinding roasted peanuts',
              timeInMinutes: 10,
            },
            {
              stepNumber: 5,
              description: 'Cook meat for soup with onions and spices',
              timeInMinutes: 25,
            },
            {
              stepNumber: 6,
              description: 'Add groundnut paste and simmer until oil surfaces',
              timeInMinutes: 25,
            },
          ],
        },
        ingredients: {
          create: [
            {
              name: 'Yam',
              amount: 1000,
              unit: 'grams',
            },
            {
              name: 'Groundnuts',
              amount: 500,
              unit: 'grams',
            },
            {
              name: 'Meat',
              amount: 500,
              unit: 'grams',
            },
            {
              name: 'Onions',
              amount: 200,
              unit: 'grams',
            },
            {
              name: 'Tomatoes',
              amount: 300,
              unit: 'grams',
            },
            {
              name: 'Pepper',
              amount: 50,
              unit: 'grams',
            },
          ],
        },
        equipment: {
          create: [
            {
              name: 'Mortar and pestle',
              optional: false,
            },
            {
              name: 'Large pot',
              optional: false,
            },
            {
              name: 'Grinder',
              optional: false,
            },
            {
              name: 'Wooden spoon',
              optional: false,
            },
          ],
        },
      },
    });

    // 5. Koko with Koose
    await prisma.mealPreparation.create({
      data: {
        mealId: '5', // Koko with Koose
        timeToMake: 50,
        difficulty: 'Medium',
        servings: 4,
        steps: {
          create: [
            {
              stepNumber: 1,
              description:
                'Mix millet flour with water and let it ferment overnight',
              timeInMinutes: 10,
            },
            {
              stepNumber: 2,
              description: 'Boil water and add the fermented millet paste',
              timeInMinutes: 15,
            },
            {
              stepNumber: 3,
              description: 'Stir continuously until thickened',
              timeInMinutes: 10,
            },
            {
              stepNumber: 4,
              description:
                'Fry koose by blending black-eyed peas and seasoning',
              timeInMinutes: 15,
            },
          ],
        },
        ingredients: {
          create: [
            { name: 'Millet flour', amount: 200, unit: 'grams' },
            { name: 'Black-eyed peas', amount: 250, unit: 'grams' },
            { name: 'Salt', amount: 1, unit: 'teaspoon' },
            { name: 'Oil', amount: 100, unit: 'ml' },
          ],
        },
        equipment: {
          create: [
            { name: 'Pot', optional: false },
            { name: 'Wooden spoon', optional: false },
            { name: 'Frying pan', optional: false },
          ],
        },
      },
    });

    // 6. Chinchinga
    await prisma.mealPreparation.create({
      data: {
        mealId: '6', // Chinchinga
        timeToMake: 40,
        difficulty: 'Easy',
        servings: 6,
        steps: {
          create: [
            {
              stepNumber: 1,
              description: 'Marinate meat with spices',
              timeInMinutes: 10,
            },
            {
              stepNumber: 2,
              description: 'Skewer meat onto sticks',
              timeInMinutes: 10,
            },
            {
              stepNumber: 3,
              description: 'Grill until cooked',
              timeInMinutes: 20,
            },
          ],
        },
        ingredients: {
          create: [
            { name: 'Meat', amount: 500, unit: 'grams' },
            { name: 'Salt', amount: 1, unit: 'teaspoon' },
            { name: 'Pepper', amount: 1, unit: 'teaspoon' },
          ],
        },
        equipment: {
          create: [
            { name: 'Skewers', optional: false },
            { name: 'Grill', optional: false },
          ],
        },
      },
    });

    // 8. Pito
    await prisma.mealPreparation.create({
      data: {
        mealId: '8', // Pito
        timeToMake: 1440, // 24 hours
        difficulty: 'Hard',
        servings: 8,
        steps: {
          create: [
            {
              stepNumber: 1,
              description: 'Soak millet overnight',
              timeInMinutes: 720,
            },
            {
              stepNumber: 2,
              description: 'Mash and ferment the soaked millet',
              timeInMinutes: 120,
            },
            {
              stepNumber: 3,
              description: 'Boil the mash and allow it to cool',
              timeInMinutes: 60,
            },
            {
              stepNumber: 4,
              description: 'Ferment for an additional 12 hours',
              timeInMinutes: 720,
            },
          ],
        },
        ingredients: {
          create: [
            { name: 'Millet', amount: 500, unit: 'grams' },
            { name: 'Water', amount: 2000, unit: 'ml' },
          ],
        },
        equipment: {
          create: [
            { name: 'Large container', optional: false },
            { name: 'Pot', optional: false },
          ],
        },
      },
    });

    // 9. Rice Balls with Light Soup
    await prisma.mealPreparation.create({
      data: {
        mealId: '9', // Rice Balls with Light Soup
        timeToMake: 90,
        difficulty: 'Medium',
        servings: 4,
        steps: {
          create: [
            {
              stepNumber: 1,
              description: 'Boil rice until soft',
              timeInMinutes: 30,
            },
            {
              stepNumber: 2,
              description: 'Mash rice to form balls',
              timeInMinutes: 10,
            },
            {
              stepNumber: 3,
              description: 'Cook meat and spices for the soup',
              timeInMinutes: 30,
            },
            {
              stepNumber: 4,
              description: 'Simmer until soup is thickened',
              timeInMinutes: 20,
            },
          ],
        },
        ingredients: {
          create: [
            { name: 'Rice', amount: 500, unit: 'grams' },
            { name: 'Meat', amount: 300, unit: 'grams' },
            { name: 'Tomatoes', amount: 200, unit: 'grams' },
            { name: 'Onions', amount: 100, unit: 'grams' },
          ],
        },
        equipment: {
          create: [
            { name: 'Pot', optional: false },
            { name: 'Serving bowl', optional: true },
          ],
        },
      },
    });

    // 10. Beans and Fried Plantain (Red Red)
    await prisma.mealPreparation.create({
      data: {
        mealId: '10', // Beans and Fried Plantain
        timeToMake: 60,
        difficulty: 'Medium',
        servings: 4,
        steps: {
          create: [
            {
              stepNumber: 1,
              description: 'Boil beans until soft',
              timeInMinutes: 30,
            },
            {
              stepNumber: 2,
              description: 'Fry onions, tomatoes, and spices',
              timeInMinutes: 15,
            },
            {
              stepNumber: 3,
              description: 'Add beans to the sauce and simmer',
              timeInMinutes: 10,
            },
            {
              stepNumber: 4,
              description: 'Fry plantains until golden brown',
              timeInMinutes: 15,
            },
          ],
        },
        ingredients: {
          create: [
            { name: 'Beans', amount: 300, unit: 'grams' },
            { name: 'Plantain', amount: 200, unit: 'grams' },
            { name: 'Onions', amount: 50, unit: 'grams' },
            { name: 'Tomatoes', amount: 100, unit: 'grams' },
          ],
        },
        equipment: {
          create: [
            { name: 'Pot', optional: false },
            { name: 'Frying pan', optional: false },
          ],
        },
      },
    });

    console.log('All meal preparations have been seeded successfully.');
  } else {
    console.log('Meals preparation already seeded.');
  }
}

module.exports = createMealPreparationAll;
