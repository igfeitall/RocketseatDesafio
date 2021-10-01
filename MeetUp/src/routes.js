import { Router } from "express";

import userController from "./app/controllers/userController";
import sessionController from "./app/controllers/SessionController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

routes.post("/users", userController.store);
routes.post("/sessions", sessionController.store);

routes.put("/users", authMiddleware, userController.update);

export default routes;
