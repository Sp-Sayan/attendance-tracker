-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('ECE', 'IT', 'CSE', 'ME', 'EE');

-- CreateEnum
CREATE TYPE "Section" AS ENUM ('A', 'B', 'C');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "institutionId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "department" "Department" NOT NULL,
    "section" "Section",
    "role" "Role" NOT NULL,
    "password" TEXT NOT NULL,
    "profilePic" TEXT DEFAULT 'null',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "classId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("classId")
);

-- CreateTable
CREATE TABLE "UserClass" (
    "fieldId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,

    CONSTRAINT "UserClass_pkey" PRIMARY KEY ("fieldId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_institutionId_key" ON "User"("institutionId");

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClass" ADD CONSTRAINT "UserClass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClass" ADD CONSTRAINT "UserClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classroom"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;
