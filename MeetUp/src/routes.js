import { Router } from "express";

import userController from "./app/controllers/userController";
import sessionController from "./app/controllers/SessionController";

const routes = new Router();

routes.post("/users", userController.store);
routes.post("/sessions", sessionController.store);

export default routes;
