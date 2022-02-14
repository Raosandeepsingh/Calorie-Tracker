var express = require('express');
var router = express.Router();
var usersRouter = require('../routes/users');
var foodRouter = require('../routes/foods');
var ActivityRouter  = require('../routes/foods');
var app = express();
const readXlsxFile = require('read-excel-file/node');



/* GET home page. */


router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
   res.send('application start ')
});








module.exports = router;
