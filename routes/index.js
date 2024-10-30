const router = require("express").Router();
const articleRouter = require("./articles");
const userRouter = require("./users");
const { createUser, loginUser } = require("../controllers/users");
const {
  validateRegisterBody,
  validateLoginBody,
} = require("../middlewares/validation");
const { NotFoundError } = require("../utils/NotFoundError");

router.use("/users", userRouter);
router.use("/articles", articleRouter);

router.post("/signin", validateLoginBody, loginUser);
router.post("/signup", validateRegisterBody, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("requested resource not found"));
});

module.exports = router;
