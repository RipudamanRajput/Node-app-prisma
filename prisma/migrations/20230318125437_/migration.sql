/*
  Warnings:

  - You are about to drop the column `bodt` on the `Update` table. All the data in the column will be lost.
  - Added the required column `body` to the `Update` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Update" DROP COLUMN "bodt",
ADD COLUMN     "body" TEXT NOT NULL;
