import { Router } from "express";
import User from "./app/models/users";

const routes = new Router();

routes.get("/", async (req, res) => {
  const user = await User.create({
    name: "Igor Feital",
    email: "igorfl@gmail.com",
    password_hash: "123132",
  });

  return res.json(user);
});

export default routes;
