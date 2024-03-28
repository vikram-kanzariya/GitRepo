const express = require("express");
const { getGrid } = require('../controllers/pagination/usercontroller')

const router = express.Router();

router.route("/data").get(getGrid)

module.exports = router;