const express = require('express');
const { dynamic , kukucube , sort , tictactoe ,events } = require('../controllers/JsTasks/usercontroller')

const router = express.Router();

router.get("/dynamic" , dynamic);
router.get("/kukucube" , kukucube);
router.get("/sort" , sort);
router.get("/tictactoe" , tictactoe);
router.get("/events" , events);

module.exports = router;