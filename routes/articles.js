const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getArticles,
  saveArticle,
  deleteArticle,
} = require("../controllers/articles");

router.get("/", auth, getArticles);

router.post("/", auth, saveArticle);

router.delete("/articleId", auth, deleteArticle);

module.exports = router;
