const express = require('express');

const userRouter = express.Router();

const jobApp = require('./JobApproute');
const searchig = require('./Searchroute');

module.exports = userRouter;
// module.exports = { userRouter , jobApp , searchig };