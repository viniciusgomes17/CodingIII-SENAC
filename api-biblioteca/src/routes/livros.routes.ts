import { Router } from "express";
import { LivroController } from "../controller/LivroController";

const routes = Router();
const controller = new LivroController();

routes.post("/", controller.criar);
routes.get("/", controller.listar);
routes.get("/:id", controller.buscarPorId);
routes.put("/:id", controller.atualizar);
routes.delete("/:id", controller.excluir);

export default routes;
