const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");

// returns information about the logged-in user (email and name)
// GET /users/me

router.get("/me", getCurrentUser);

module.exports = router;
