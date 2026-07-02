/*
  Warnings:

  - You are about to drop the column `location` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `preferredLocation` on the `TenantProfile` table. All the data in the column will be lost.
  - Added the required column `city` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredCity` to the `TenantProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredState` to the `TenantProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Listing" DROP COLUMN "location",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."TenantProfile" DROP COLUMN "preferredLocation",
ADD COLUMN     "preferredCity" TEXT NOT NULL,
ADD COLUMN     "preferredState" TEXT NOT NULL;
