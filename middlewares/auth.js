const jwt = require("jsonwebtoken");
const { ForbiddenError } = require("../utils/ForbiddenError");

const JWT_SECRET = process.env.JWT_SECRET || "jwt-secret";

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return next(ForbiddenError("Unauthorized action"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return next(ForbiddenError("Unauthorized action"));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
