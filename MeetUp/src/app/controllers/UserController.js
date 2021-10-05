import * as Yup from "yup";
import User from "../models/users";

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: "Validation error. " });
    }

    let userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res.status(400).json({ erro: "Email alredy signUp." });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: "Validation error. " });
    }

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      let userExist = await User.findOne({ where: { email } });

      if (userExist) {
        return res.status(400).json({ erro: "Email alredy signUp." });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ erro: "Password does not match. " });
    }

    console.log(req.body);

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
