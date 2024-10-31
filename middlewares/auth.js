const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/UnauthorizedError");

const JWT_SECRET = process.env.JWT_SECRET || "jwt-secret";

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return next(new UnauthorizedError("Unauthorized action"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return next(new UnauthorizedError("Unauthorized action"));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
