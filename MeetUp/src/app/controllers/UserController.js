import User from "../models/users";

class UserController {
  async store(req, res) {
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
    const id = req.userId;
    let userBd = await User.findOne({ where: { id } });
    let { email, new_email } = req.body;

    if (!(email === userBd.email)) {
      return res.status(400).json({ erro: "Email does not found." });
    }

    return res.json({ user: userBd });
  }
}

export default new UserController();
