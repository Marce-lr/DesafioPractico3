const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models/user.model");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  db.createUser(email, hashedPassword, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    res.status(201).send({ message: "Usuario registrado correctamente" });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.findUserByEmail(email, (err, user) => {
    if (err || !user)
      return res.status(404).send({ message: "Usuario no encontrado" });
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 horas
    });

    res.status(200).send({ token });
  });
};
