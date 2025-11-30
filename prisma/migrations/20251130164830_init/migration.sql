/*
  Warnings:

  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MealPreparation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NutritionInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrepEquipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrepIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrepStep` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserExercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMeal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserNutritionGoal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WaterConsumption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeightRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MealPreparation" DROP CONSTRAINT "MealPreparation_mealId_fkey";

-- DropForeignKey
ALTER TABLE "NutritionInfo" DROP CONSTRAINT "NutritionInfo_userId_fkey";

-- DropForeignKey
ALTER TABLE "PrepEquipment" DROP CONSTRAINT "PrepEquipment_mealPrepId_fkey";

-- DropForeignKey
ALTER TABLE "PrepIngredient" DROP CONSTRAINT "PrepIngredient_mealPrepId_fkey";

-- DropForeignKey
ALTER TABLE "PrepStep" DROP CONSTRAINT "PrepStep_mealPrepId_fkey";

-- DropForeignKey
ALTER TABLE "UserExercise" DROP CONSTRAINT "UserExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "UserExercise" DROP CONSTRAINT "UserExercise_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserMeal" DROP CONSTRAINT "UserMeal_mealId_fkey";

-- DropForeignKey
ALTER TABLE "UserMeal" DROP CONSTRAINT "UserMeal_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserNutritionGoal" DROP CONSTRAINT "UserNutritionGoal_userId_fkey";

-- DropForeignKey
ALTER TABLE "WaterConsumption" DROP CONSTRAINT "WaterConsumption_userId_fkey";

-- DropForeignKey
ALTER TABLE "WeightRecord" DROP CONSTRAINT "WeightRecord_userId_fkey";

-- DropTable
DROP TABLE "Exercise";

-- DropTable
DROP TABLE "MealPreparation";

-- DropTable
DROP TABLE "NutritionInfo";

-- DropTable
DROP TABLE "PrepEquipment";

-- DropTable
DROP TABLE "PrepIngredient";

-- DropTable
DROP TABLE "PrepStep";

-- DropTable
DROP TABLE "UserExercise";

-- DropTable
DROP TABLE "UserMeal";

-- DropTable
DROP TABLE "UserNutritionGoal";

-- DropTable
DROP TABLE "WaterConsumption";

-- DropTable
DROP TABLE "WeightRecord";

-- CreateTable
CREATE TABLE "Condition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCondition" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "conditionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommendedMeal" (
    "id" TEXT NOT NULL,
    "conditionId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "reason" TEXT,
    "score" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecommendedMeal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Condition_name_key" ON "Condition"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserCondition_userId_conditionId_key" ON "UserCondition"("userId", "conditionId");

-- CreateIndex
CREATE UNIQUE INDEX "RecommendedMeal_conditionId_mealId_key" ON "RecommendedMeal"("conditionId", "mealId");

-- AddForeignKey
ALTER TABLE "UserCondition" ADD CONSTRAINT "UserCondition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCondition" ADD CONSTRAINT "UserCondition_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "Condition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendedMeal" ADD CONSTRAINT "RecommendedMeal_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "Condition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendedMeal" ADD CONSTRAINT "RecommendedMeal_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
