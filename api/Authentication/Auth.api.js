const express = require('express');
const router = express.Router();
const Authentication = require('../../controllers/Authentication/auth.controller');

router.post("/register",Authentication.Register);
router.post("/login",Authentication.Login);
router.get("/logout",Authentication.Logout);
router.get("/profile",Authentication.getUserData);
router.patch("/update",Authentication.Update);
module.exports = router;
