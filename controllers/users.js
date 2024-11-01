const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const User = require("../models/user");

const { SUCCESSFUL_REQUEST } = require("../utils/status");

const JWT_SECRET = process.env.JWT_SECRET || "jwt-secret";

const { BadRequestError } = require("../utils/BadRequestError");
const { NotFoundError } = require("../utils/NotFoundError");
const { UnauthorizedError } = require("../utils/UnauthorizedError");
const { ConflictError } = require("../utils/ConflictError");

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if email is missing
  if (!email) {
    return next(new BadRequestError("Email is required"));
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return next(new BadRequestError("Invalid email format"));
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new Error("Email already in use");
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      User.create({ name, email, password: hash }).then((newUser) => {
        const response = newUser.toObject();
        delete response.password;

        return res.status(SUCCESSFUL_REQUEST).send({ data: response });
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      if (err.message === "Email already in use") {
        return next(
          new ConflictError("An account exists already with this email")
        );
      }
      return next(err);
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Invalid email or password"));
  }

  if (!validator.isEmail(email)) {
    return next(new BadRequestError("Invalid email format"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedError("Invalid email or password"));
      }
      return next(err);
    });
};

module.exports = { getCurrentUser, createUser, loginUser };
