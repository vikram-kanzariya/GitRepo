const express = require('express');
const { getAttendance } = require('../controllers/attendance/usercontroller');

const router = express.Router();

router.route("/attendance").get(getAttendance);

module.exports = router;