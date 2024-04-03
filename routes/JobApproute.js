const express = require('express');

const { getForm , getUser ,  geteditForm , createUser , updateUser , getAllUsers} = require('../controllers/JobApp/usercontroller');

const router = express.Router();

router.route("/send")
.get(getForm)
.post(createUser);

router.route("/user/:id")
.get(getUser);

router.route("/update")
.get(geteditForm)
.post(updateUser)

router.route("/alluser").get(getAllUsers);
  
module.exports = router;