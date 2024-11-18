const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');

async function createMeals() {
  const existingUser = await prisma.user.findUnique({
    where: { email: 'user@example.com' },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('pass1234', 10);
    const user = await prisma.user.create({
      data: {
        email: 'user@example.com',
        password: hashedPassword,
        name: 'Sample User',
      },
    });
    console.log(`User with ID ${user.id} created successfully.`);
  } else {
    console.log('User already exists, skipping user seeding.');
  }

  const existingExercise = await prisma.exercise.findFirst();
  if (!existingExercise) {
    await prisma.exercise.createMany({
      data: [
        {
          id: '1',
          name: 'Running',
          caloriesPerMinute: 10,
          duration: 30,
          description:
            'A fast-paced exercise that improves cardiovascular fitness.',
        },
        {
          id: '2',
          name: 'Cycling',
          caloriesPerMinute: 8,
          duration: 60,
          description:
            'A low-impact exercise that strengthens the legs and improves endurance.',
        },
        {
          id: '3',
          name: 'Swimming',
          caloriesPerMinute: 7,
          duration: 45,
          description: 'A full-body workout that is gentle on the joints.',
        },
        {
          id: '4',
          name: 'Weight Lifting',
          caloriesPerMinute: 6,
          duration: 60,
          description: 'Strength training using weights to build muscle mass.',
        },
        {
          id: '5',
          name: 'Yoga',
          caloriesPerMinute: 5,
          duration: 60,
          description:
            'A practice that combines physical postures with breathing techniques.',
        },
        {
          id: '6',
          name: 'HIIT',
          caloriesPerMinute: 12,
          duration: 20,
          description:
            'High-intensity interval training that alternates short bursts of intense exercise.',
        },
        {
          id: '7',
          name: 'Rowing',
          caloriesPerMinute: 9,
          duration: 30,
          description:
            'A low-impact exercise that targets multiple muscle groups.',
        },
        {
          id: '8',
          name: 'Boxing',
          caloriesPerMinute: 10,
          duration: 40,
          description: 'A combat sport that improves fitness and agility.',
        },
        {
          id: '9',
          name: 'Skiing',
          caloriesPerMinute: 11,
          duration: 120,
          description:
            'An outdoor activity that involves gliding down snow-covered slopes.',
        },
        {
          id: '10',
          name: 'Walking',
          caloriesPerMinute: 4,
          duration: 30,
          description:
            'A simple and accessible form of exercise suitable for all ages.',
        },
      ],
    });
    console.log('Exercises seeded successfully.');
  } else {
    console.log('Exercises already exist, skipping exercise seeding.');
  }

  // Check if meals are already seeded
  const existingMeal = await prisma.meal.findFirst();
  if (!existingMeal) {
    // Seed meals if not already present
    await prisma.meal.createMany({
      data: [
        {
          id: '1',
          name: 'Tuo Zaafi',
          calories: 450,
          protein: 20.0,
          carbohydrates: 75.0,
          fat: 10.0,
          photo: 'tuozaafi.jpg',
          description: 'A popular dish made from maize and served with soups.',
        },
        {
          id: '2',
          name: 'Wasawasa',
          calories: 300,
          protein: 10.0,
          carbohydrates: 60.0,
          fat: 5.0,
          photo: 'wasawasa.jpg',
          description:
            'A meal made from steamed yam flour and served with oil.',
        },
        {
          id: '3',
          name: 'Tubani',
          calories: 350,
          protein: 15.0,
          carbohydrates: 40.0,
          fat: 8.0,
          photo: 'tubani.jpg',
          description:
            'Steamed bean cakes served with spicy oil or tomato sauce.',
        },
        {
          id: '4',
          name: 'Zomkom',
          calories: 150,
          protein: 2.0,
          carbohydrates: 35.0,
          fat: 1.0,
          photo: 'zomkom.jpg',
          description: 'A millet-based porridge served cold, often with sugar.',
        },
        {
          id: '5',
          name: 'Koko with Koose',
          calories: 250,
          protein: 10.0,
          carbohydrates: 40.0,
          fat: 12.0,
          photo: 'kokokoose.jpg',
          description:
            'Millet porridge (Koko) served with fried bean cakes (Koose).',
        },
        {
          id: '6',
          name: 'Chinchinga',
          calories: 500,
          protein: 30.0,
          carbohydrates: 10.0,
          fat: 40.0,
          photo: 'chinchinga.jpg',
          description: 'Grilled meat skewers seasoned with spices.',
        },
        {
          id: '7',
          name: 'Fufu with Groundnut Soup',
          calories: 700,
          protein: 40.0,
          carbohydrates: 80.0,
          fat: 30.0,
          photo: 'fufugroundnut.jpg',
          description:
            'A pounded yam dish served with rich groundnut (peanut) soup.',
        },
        {
          id: '8',
          name: 'Pito',
          calories: 200,
          protein: 3.0,
          carbohydrates: 20.0,
          fat: 0.0,
          photo: 'pito.jpg',
          description:
            'A local alcoholic beverage brewed from millet or sorghum.',
        },
        {
          id: '9',
          name: 'Rice Balls with Light Soup',
          calories: 550,
          protein: 35.0,
          carbohydrates: 70.0,
          fat: 15.0,
          photo: 'riceballsoup.jpg',
          description:
            'Soft rice balls served with light tomato or pepper soup.',
        },
        {
          id: '10',
          name: 'Beans and Fried Plantain (Red Red)',
          calories: 600,
          protein: 25.0,
          carbohydrates: 90.0,
          fat: 20.0,
          photo: 'redred.jpg',
          description:
            'A classic dish of beans stew served with fried ripe plantains.',
        },
      ],
    });
    console.log('Meals seeded successfully.');
  } else {
    console.log('Meals already exist, skipping meal seeding.');
  }
}

module.exports = createMeals;
