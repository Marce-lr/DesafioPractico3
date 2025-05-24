const db = require("../models/db");

exports.createUser = (email, password, callback) => {
  const query = "INSERT INTO usuarios (email, password) VALUES (?, ?)";
  db.query(query, [email, password], callback);
};

exports.findUserByEmail = (email, callback) => {
  const query = "SELECT * FROM usuarios WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};
