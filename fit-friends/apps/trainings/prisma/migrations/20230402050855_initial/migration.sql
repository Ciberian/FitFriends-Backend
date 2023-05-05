-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('Visa', 'Mir', 'Umoney');

-- CreateTable
CREATE TABLE "Training" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "caloriesToLose" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "price" INTEGER,
    "rating" DOUBLE PRECISION,
    "trainer" TEXT,
    "isSpecialOffer" BOOLEAN NOT NULL,
    "registerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "trainerId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalTraining" (
    "id" SERIAL NOT NULL,
    "initiator" TEXT NOT NULL,
    "invitee" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "changeStatusDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PersonalTraining_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
