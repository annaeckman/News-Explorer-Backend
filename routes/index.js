const router = require("express").Router();
const articleRouter = require("./articles");
const userRouter = require("./users");

router.use("/users", userRouter);

module.exports = router;
