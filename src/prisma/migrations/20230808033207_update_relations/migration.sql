/*
  Warnings:

  - You are about to drop the `Categorias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Categorias" DROP CONSTRAINT "Categorias_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "Categorias" DROP CONSTRAINT "Categorias_postagemId_fkey";

-- DropTable
DROP TABLE "Categorias";

-- CreateTable
CREATE TABLE "_CategoriaToPostagem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriaToPostagem_AB_unique" ON "_CategoriaToPostagem"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriaToPostagem_B_index" ON "_CategoriaToPostagem"("B");

-- AddForeignKey
ALTER TABLE "_CategoriaToPostagem" ADD CONSTRAINT "_CategoriaToPostagem_A_fkey" FOREIGN KEY ("A") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToPostagem" ADD CONSTRAINT "_CategoriaToPostagem_B_fkey" FOREIGN KEY ("B") REFERENCES "Postagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
