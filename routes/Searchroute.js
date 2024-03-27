const express = require('express');
const {getSearchbar, getSearch , postData , getData} = require('../controllers/search/usercontroller');

const router = express.Router();


router.route("/search").get(getSearchbar);

router.route("/searchdata")
.get(getSearch)
.post(postData)

router.route('/data')
.get(getData)

module.exports = router;