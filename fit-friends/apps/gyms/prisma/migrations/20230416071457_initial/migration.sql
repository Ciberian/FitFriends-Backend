-- CreateTable
CREATE TABLE "Gym" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "isVerified" BOOLEAN,
    "gymParams" TEXT[],
    "photos" TEXT[],
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "registerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gym_pkey" PRIMARY KEY ("id")
);
