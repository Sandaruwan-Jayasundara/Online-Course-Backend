const express = require("express");
const router = express.Router();

const Authentication = require("../api/Authentication/Auth.api");
router.use("/auth-signup", Authentication);

module.exports = router;
