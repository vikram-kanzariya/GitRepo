const express = require('express');
const { getHomePage , getPostId }  = require('../controllers/jsonplaceholder/usercontroller')

const router = express.Router();

router.route("/posts").get(getHomePage);
router.route("/posts/:id").get(getPostId);

module.exports = router;