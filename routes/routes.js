const express = require('express');

const userRouter = express.Router();

const jobApp = require('./JobApproute');
const searchig = require('./Searchroute');
const delimited = require('./delimited');
const dynamicgrid = require('./dynamicgrid')
const ajax = require('./ajax')
const attendance = require('./attendance');
const result = require('./result');
const pagination = require('./pagination');
const registration = require('./registration');

module.exports = userRouter;
// module.exports = { userRouter , jobApp , searchig };