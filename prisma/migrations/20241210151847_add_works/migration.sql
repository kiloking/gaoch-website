-- CreateTable
CREATE TABLE "Repair" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT '待處理',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Repair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "bgimg" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT,
    "ytVideoUrl" TEXT,
    "details" JSONB NOT NULL,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);
