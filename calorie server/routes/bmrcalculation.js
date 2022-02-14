var express = require('express');
const { ObjectId } = require('mongodb');
const { body } = require('express-validator');
const req = require('express/lib/request');
var router = express.Router();
var { bmrCollection } = require('../db/collections');
const { commonStatus } = require('../db/commonStatus');
const { bmrCalculation } = require('../db/validator.js')
var app = require('./users');






module.exports = router;
