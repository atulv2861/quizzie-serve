const express = require('express');
const router= express.Router();

const { registerUser,
    loginUser, logoutUser,getNewAccessToken } = require('../controller/userController');
const {isAuth} = require('../middleware/authMiddleware');

// user registration
router.post("/registerUser",registerUser);
router.post("/loginUser",loginUser);
router.post("/userLogout",isAuth, logoutUser);
router.post("/getNewAccessToken",getNewAccessToken);





module.exports = router