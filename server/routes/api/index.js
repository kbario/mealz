const router = require("express").Router();
const userRoutes = require("./user-routes");
const githubRoutes = require("./github");

router.use("/users", userRoutes);
router.use("/github", githubRoutes);

module.exports = router;
