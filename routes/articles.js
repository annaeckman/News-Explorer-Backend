const router = require("express").Router();
const {
  getArticles,
  createSavedArticle,
  deleteArticle,
} = require("../controllers/articles");

router.get("/articles", getArticles);

router.post("/articles", createSavedArticle);

router.delete("/articles/articleId", deleteArticle);

module.exports = router;
