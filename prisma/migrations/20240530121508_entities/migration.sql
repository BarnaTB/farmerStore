-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Farmer', 'Admin');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Farmer',
    "land_size" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fertilizers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity_limit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Fertilizers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seeds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity_limit" DOUBLE PRECISION NOT NULL,
    "fertilizer_id" TEXT NOT NULL,

    CONSTRAINT "Seeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "fertilizer_id" TEXT NOT NULL,
    "seed_id" TEXT NOT NULL,
    "land_size" DOUBLE PRECISION NOT NULL,
    "fertilizer_quantity" DOUBLE PRECISION NOT NULL,
    "seeds_quantity" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "paid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Seeds" ADD CONSTRAINT "Seeds_fertilizer_id_fkey" FOREIGN KEY ("fertilizer_id") REFERENCES "Fertilizers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_fertilizer_id_fkey" FOREIGN KEY ("fertilizer_id") REFERENCES "Fertilizers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_seed_id_fkey" FOREIGN KEY ("seed_id") REFERENCES "Seeds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
