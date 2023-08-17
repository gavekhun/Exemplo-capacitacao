import { Router } from "express";
import categoriaController from "../controllers/categoriaController";
import usuarioController from "../controllers/usuarioController";
import postagemController from "../controllers/postagemController";

const router = Router();

// Rotas de categoria
router.get("/categorias", categoriaController.show)
router.get("/categoria/:id", categoriaController.index)
router.post("/categoria", categoriaController.create)
router.delete("/categoria/:id", categoriaController.delete)
router.get("/search/categorias", categoriaController.search)

// Rotas de usuário
router.post("/usuario", usuarioController.create)
router.put("/usuario/:id", usuarioController.update)
router.get("/usuario", usuarioController.show)
router.get("/usuarios/:id", usuarioController.index)
router.delete("/usuario/:id", usuarioController.delete)

// Rotas de postagens
router.post("/postagem", postagemController.create)
router.get("/postagens", postagemController.show)
router.get("/postagem/:id", postagemController.index)
router.put("/postagem/:id", postagemController.update)
router.delete("/postagem/:id", postagemController.delete)

export { router }