-- CreateTable
CREATE TABLE "Agent" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "address" TEXT,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProsperityHub" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "ProsperityHub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warehouse" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agent_email_key" ON "Agent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_userName_key" ON "Agent"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_phone_key" ON "Agent"("phone");

-- AddForeignKey
ALTER TABLE "ProsperityHub" ADD CONSTRAINT "ProsperityHub_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
