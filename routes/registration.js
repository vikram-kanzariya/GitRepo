const express = require("express");
// const { getResult , getResultById } = require('../controllers/result/usercontroller')
const { getRegisterForm , RegisterUser , getLoginForm , LoginUser , forgotForm , forgotLink , resetPasswordForm , upatePassword , authUser , userDetails , logout , activateUser , verifyUser} = require('../controllers/registration/usercontroller');

const router = express.Router();

router.route("/register")
.get(getRegisterForm)
.post(RegisterUser);

router.route("/login")
.get(getLoginForm)
.post(LoginUser);

router.route("/forgot")
.get(forgotForm)
.post(forgotLink);

router.route("/reset")
.get(resetPasswordForm)
.post(upatePassword);

// router.route("/details")
// .get(authUser , userDetails);

router.route("/details")
.get(authUser , userDetails);

router.route("/logout")
.get(logout);

router.route("/token")
.get(activateUser);

router.route("/verify")
.get(verifyUser);

module.exports = router;