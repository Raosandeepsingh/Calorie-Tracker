var express = require('express');
const { ObjectID } = require('bson');
var router = express.Router();
var { activityCollection, addActivityCollection } = require('../db/collections');
const { commonStatus } = require('../db/commonStatus');
const readXlsxFile = require('read-excel-file/node');





router.get('/createActivity', function (req, res, next) {
  console.log(req.query)
  var allUsers = userCollection.insertOne(req.query)
  res.send(allUsers);
});




router.get('/getAllActivity', async function (req, res, next) {
  let activityData = await activityCollection.aggregate([{
    $group: {
      _id: "$ACTIVITY"
    }
  }]).toArray()
  console.log(activityData);
  res.send(activityData || 'data not found')
});
router.get('/getDescriptionByName', async function (req, res, next) {
  let query = { ...req.query, status: 1 };
  console.log("query", query);
  let activitydescription = await activityCollection.find({ "ACTIVITY": query.aName }).toArray()
  console.log(activitydescription)
  res.send(activitydescription);
});

router.post('/saveActivityData', (req, res) => {
  console.log(req.body)
  addActivityCollection.insertOne({
    userDate:req.body.date,
   
    userID: req.body.userId,
    calorieOut: req.body.calorieOut,
    ["activity name"]: req.body.activityName,
    ["activity Description"]: req.body.activityDescription,
    Time: req.body.time,
    METs: req.body.metValue,
    createDate: new Date(),
    updateDate: new Date()
  }).then(saveActivityData => res.json(saveActivityData))

})

router.get('/getAllActivityData', function (req, res, next) {
  userCollection.find({ status: commonStatus.active }).toArray().then((err, allActivitData) => {
    res.send(allActivitData);
    console.log('sahgwuefgeuvdvscgsvcdskctvewk',allActivitData)
  })
});


router.get('/diplayActivityData',async function (req, res, next) {
  let query = {...req.query, status: 1 };
  console.log("query",query);
  console.log({"userDate": query.aData,userID:query.userId})
    let foodName = await addActivityCollection.find({"userDate": query.aData,userID:query.userId}).toArray()
  console.log(foodName)
    res.send(foodName);
});





router.get('/saveActivitydata', function (req, res, next) {


  let datas = readXlsxFile('./MET-value.xlsx').then((rows) => {
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
      activityCollection.insertOne(data)
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
  res.send('jkjkjhkjh')
})



module.exports = router;