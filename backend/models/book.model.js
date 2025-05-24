const db = require("../models/db");

exports.findBooksByUserId = (userId, callback) => {
  db.query("SELECT * FROM libros WHERE usuario_id = ?", [userId], callback);
};

exports.findBookById = (id, userId, callback) => {
  db.query(
    "SELECT * FROM libros WHERE id = ? AND usuario_id = ?",
    [id, userId],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    }
  );
};

exports.createBook = (book, callback) => {
  const {
    usuario_id,
    titulo,
    autor,
    estado,
    fecha_inicio,
    fecha_fin,
    comentario,
  } = book;
  db.query(
    `INSERT INTO libros (usuario_id, titulo, autor, estado, fecha_inicio, fecha_fin, comentario)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [usuario_id, titulo, autor, estado, fecha_inicio, fecha_fin, comentario],
    callback
  );
};

exports.updateBook = (id, userId, book, callback) => {
  const { titulo, autor, estado, fecha_inicio, fecha_fin, comentario } = book;
  db.query(
    `UPDATE libros SET titulo=?, autor=?, estado=?, fecha_inicio=?, fecha_fin=?, comentario=?
     WHERE id=? AND usuario_id=?`,
    [titulo, autor, estado, fecha_inicio, fecha_fin, comentario, id, userId],
    callback
  );
};

exports.deleteBook = (id, userId, callback) => {
  db.query(
    "DELETE FROM libros WHERE id=? AND usuario_id=?",
    [id, userId],
    callback
  );
};
