var express = require('express');
const { ObjectID } = require('bson');
var router = express.Router();
var { foodCollection, addFoodCollection } = require('../db/collections');
const { commonStatus } = require('../db/commonStatus');
const readXlsxFile = require('read-excel-file/node');
const { body } = require('express-validator');

router.get('/', function (req, res, next) {
  res.send("ffsfsfsfdsfdfdssall");
});


router.get('/getAllFoods', function (req, res, next) {
  var allFood = foodCollection.find({ status: commonStatus.active })
  res.send(allFood);
});

router.get('/updateFoods', function (req, res, next) {
  res.send('respond with a resource');
});


router.get('/getFoodById', function (req, res, next) {
  var food = foodCollection.find({ id: ObjectID(req.query.id) })
  res.send(food);
});




// Requiring the module


router.get('/savefooddata', function (req, res, next) {


  let datas = readXlsxFile('./food-calories.xlsx').then((rows) => {
    let heading = rows[0];
    let values = [rows[0]];

    for (let i = 1; i < rows.length; i++) {
      var data = {};
      for (let j = 0; j <= 7; j++) {
        data[heading[j]] = rows[i][j]

      }
      if (rows[i][7]) {
        let y = rows[i][7].split(" ");
        if (y && y.length) {
          data['quantity'] = Number(y[0]);
          data['type'] = y[1]
        }
      }
      values.push(data)
      foodCollection.insertOne(data)
    }
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(values);
      }, 2000)
      console.log(values);
    })
  })
    .then(function (result) {
      return result;
    });
  //  res.send('jkjkjhkjh')
})


router.get('/getAllfood', async function (req, res, next) {
  let foodData = await foodCollection.aggregate([{
    $group: {
      _id: "$Food Group"
    }
  }]).toArray()
  // console.log(foodData);
  res.send(foodData || 'data not found')

});

router.get('/getFoodGroupByName',async function (req, res, next) {
  let query = {...req.query, status: 1 };
  // console.log("query",query);
    let foodName = await foodCollection.find({"Food Group": query.fGroup}).toArray()
    // console.log(foodName)
    res.send(foodName);
});
router.post('/saveFoodData',(req, res) => {
  console.log(req.body)
  addFoodCollection.insertOne({
    userDate:req.body.date,
    mealType:req.body.mealType,
    userID:req.body.userId,
    group: req.body.group,
    _id:req.body.name,
    serving:req.body.serving,
    calorie:req.body.calorie,
    createDate: new Date(),
    updateDate: new Date()
  }).then(saveFoodData => res.json(saveFoodData))

})

router.get('/diplayFoodData',async function (req, res, next) {
  let query = {...req.query, status: 1 };
  // console.log("query",query);
    let foodName = await addFoodCollection.find({"userDate":query.aData,userID:query.userId}).toArray()
    // console.log(foodName)
    res.send(foodName);
});






module.exports = router;
