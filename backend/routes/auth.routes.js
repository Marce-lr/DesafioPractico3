const authController = require("../controllers/auth.controller");

module.exports = (app) => {
  const router = require("express").Router();

  router.post("/register", authController.register);
  router.post("/login", authController.login);

  app.use("/api/auth", router);
};
