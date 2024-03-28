const express = require('express');
const { getUsers , getForm , createUser , getUserById , getEditForm , updateById } = require('../controllers/ajax/usercontroller')

const router = express.Router();


router.route("/users").get(getUsers);
router.route("/send").get(getForm).post(createUser);
router.route("/user/:id").get(getUserById);
router.route("/update/:id").get(getEditForm).post(updateById);

module.exports = router;    