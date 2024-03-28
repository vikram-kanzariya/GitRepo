const express = require("express");
const { getResult , getResultById } = require('../controllers/result/usercontroller')

const router = express.Router();

router.route("/result").get(getResult);
router.route("/result/:id").get(getResultById);

module.exports = router;