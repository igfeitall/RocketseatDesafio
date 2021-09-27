module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "docker",
  database: "postgres",
  define: {
    timestamp: true,
    undescorded: true,
    undescoredAll: true,
  },
};
