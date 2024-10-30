const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getArticles,
  saveArticle,
  deleteArticle,
} = require("../controllers/articles");
const { validateArticleData } = require("../middlewares/validation");

router.get("/", auth, getArticles);

router.post("/", auth, validateArticleData, saveArticle);

router.delete("/:id", auth, deleteArticle);

module.exports = router;
