const express = require("express");
const router = express.Router();

const UserManagement = require("../api/UserManagement/UserManagement.api");
router.use("/user-management", UserManagement);

module.exports = router;
