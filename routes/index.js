const router = require("express").Router();
const articleRouter = require("./articles");
const userRouter = require("./users");
const { createUser, loginUser } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/articles", articleRouter);

router.post("/signin", loginUser);
router.post("/signup", createUser);

router.use((req, res, next) => {
  next(res.status(400).send({ message: "requested resource not found" }));
});

module.exports = router;
