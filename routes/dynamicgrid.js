const express = require('express');
const { getData , allData } = require("../controllers/dynamicgrid/usercontroller");

const router = express.Router();

router.route("/").get(getData);
router.route("/post").all(allData);

module.exports = router;
