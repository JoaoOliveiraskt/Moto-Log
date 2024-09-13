-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'LOJISTA');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CLIENT';
