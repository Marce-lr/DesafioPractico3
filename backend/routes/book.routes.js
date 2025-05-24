const authMiddleware = require("../middlewares/auth.middleware");
const bookController = require("../controllers/book.controller");

module.exports = (app) => {
  const router = require("express").Router();

  router.get("/", authMiddleware, bookController.getAllBooks);
  router.get("/:id", authMiddleware, bookController.getBookById);
  router.post("/", authMiddleware, bookController.createBook);
  router.put("/:id", authMiddleware, bookController.updateBook);
  router.delete("/:id", authMiddleware, bookController.deleteBook);

  app.use("/api/books", router);
};
