const express = require('express');
const { getSearch , postSearch } = require('../controllers/delimited/usercontroller')

const router = express.Router();

router.route("/delimitedsearch").get(getSearch).post(postSearch);

module.exports = router;