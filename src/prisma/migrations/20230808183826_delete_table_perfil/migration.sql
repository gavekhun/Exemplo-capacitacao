/*
  Warnings:

  - You are about to drop the column `perfilId` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Perfil` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dataDeNascimento` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoPerfil` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_perfilId_fkey";

-- DropIndex
DROP INDEX "Usuario_perfilId_key";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "perfilId",
ADD COLUMN     "bio" VARCHAR(255),
ADD COLUMN     "dataDeNascimento" DATE NOT NULL,
ADD COLUMN     "fotoPerfil" TEXT NOT NULL,
ADD COLUMN     "nome" VARCHAR(45) NOT NULL,
ADD COLUMN     "telefone" VARCHAR(45) NOT NULL;

-- DropTable
DROP TABLE "Perfil";
