import { Router } from "express";

const routes = new Router();

routes.get("/", (req, res) => res.json({ menssage: "bondia" }));

export default routes;
