const Article = require("../models/article");
const { BadRequestError } = require("../utils/BadRequestError");
const { ForbiddenError } = require("../utils/ForbiddenError");
const { NotFoundError } = require("../utils/NotFoundError");

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send(articles))
    .catch(next);
};

const createSavedArticle = (req, res, next) => {
  // this happens when a user that is signed in clicks the save button...
  // I want it to grab all the properties from the article that the save button is on
  // AND the owner id, and the keyword that was used to search for said article
};

const deleteArticle = (req, res, next) => {};

module.exports = { getArticles, createSavedArticle, deleteArticle };
