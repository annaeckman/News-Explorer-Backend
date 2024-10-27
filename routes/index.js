const router = require("express").Router();
const articleRouter = require("./articles");
const userRouter = require("./users");
const { createUser, loginUser } = require("../controllers/users");
const {
  validateRegisterBody,
  validateLoginBody,
} = require("../middlewares/validation");

router.use("/users", userRouter);
router.use("/articles", articleRouter);

router.post("/signin", validateLoginBody, loginUser);
router.post("/signup", validateRegisterBody, createUser);

router.use((req, res, next) => {
  next(res.status(400).send({ message: "requested resource not found" }));
});

module.exports = router;
