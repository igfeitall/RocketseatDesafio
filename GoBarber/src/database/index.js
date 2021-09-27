import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import User from "../app/models/users";

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
