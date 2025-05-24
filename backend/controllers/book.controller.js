const db = require("../models/book.model");

exports.getAllBooks = (req, res) => {
  db.findBooksByUserId(req.userId, (err, data) => {
    if (err) return res.status(500).send({ message: err.message });
    res.send(data);
  });
};

exports.getBookById = (req, res) => {
  db.findBookById(req.params.id, req.userId, (err, book) => {
    if (err || !book)
      return res.status(404).send({ message: "Libro no encontrado" });
    res.send(book);
  });
};

exports.createBook = (req, res) => {
  const newBook = { ...req.body, usuario_id: req.userId };
  db.createBook(newBook, (err, data) => {
    if (err) return res.status(500).send({ message: err.message });
    res.status(201).send(data);
  });
};

exports.updateBook = (req, res) => {
  db.updateBook(req.params.id, req.userId, req.body, (err, result) => {
    if (err || result.affectedRows === 0)
      return res
        .status(404)
        .send({ message: "Libro no encontrado o sin permisos" });
    res.send({ message: "Libro actualizado correctamente" });
  });
};

exports.deleteBook = (req, res) => {
  db.deleteBook(req.params.id, req.userId, (err, result) => {
    if (err || result.affectedRows === 0)
      return res
        .status(404)
        .send({ message: "Libro no encontrado o sin permisos" });
    res.send({ message: "Libro eliminado" });
  });
};
