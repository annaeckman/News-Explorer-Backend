const Article = require("../models/article");
const { BadRequestError } = require("../utils/BadRequestError");
const { ForbiddenError } = require("../utils/ForbiddenError");
const { NotFoundError } = require("../utils/NotFoundError");
const mongoose = require("mongoose");

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

const saveArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      res.send({ data: article });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      }
      return next(err);
    });
};

const deleteArticle = (req, res, next) => {
  const articleId = req.params.id;
  const userId = req.user._id;

  Article.findById(articleId)
    .orFail()
    .then((article) => {
      const articleOwner = new mongoose.Types.ObjectId(
        article.owner
      ).toString();

      if (articleOwner === userId) {
        return Article.findByIdAndDelete({ _id: article._id }).then((article) =>
          res.send({ data: article })
        );
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(err);
    });
};

module.exports = { getArticles, saveArticle, deleteArticle };
