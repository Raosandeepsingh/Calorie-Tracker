const { query } = require('express');
var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();
var { userCollection, memberCollection, bmrCollection } = require('../db/collections');
const { commonStatus } = require('../db/commonStatus');
const { userValidationRules, validate, checkAuth, bmrCalculation, calculateAge } = require('../db/validator.js')


router.post('/createUser', userValidationRules(), validate, async (req, res) => {
  console.log(req.body)
  var age = await calculateAge(req.body.dob)

  var bmr = await bmrCalculation(age, req.body.Weight, req.body.Height, req.body.gender)

  console.log(age)
  memberCollection.insertOne({
    name: req.body.name,
    Weight: req.body.Weight,
    Height: req.body.Height,
    dob: req.body.dob,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    status: 1,
    bmr: bmr,
    Age: age,
    createDate: new Date(),
    updateDate: new Date()
  }).then(createUser => res.json(createUser))

})

router.get('/test1', function (req, res, next) {
  res.send('1234');
});

router.get('/createUser', async function (req, res, next) {
  console.log(req.query)
  var allUsers = await userCollection.insertOne(req.query)
  res.send(allUsers);
});


router.get('/getAllUser', async function (req, res, next) {

  let allUsers = await  memberCollection.find({}).toArray();
  console.log(allUsers)
    res.send(allUsers);


});

router.delete('/deleteData',async (req,res,next)=>{
    var whereQ = { _id: new ObjectId(req.query._id) };
    console.log(whereQ);
    memberCollection.deleteOne(whereQ, function (err, data) {
      // console.log(data)
      if (data) { res.send(data) } else {
        res.send('no data found')
      }
    })

})

router.get('/updateUser', function (req, res, next) {
  res.send('respond with a resource');
});


router.get('/getUserById', function (req, res, next) {
  var whereQ = { _id: new ObjectId(req.query._id) };
  console.log(whereQ);
  memberCollection.findOne(whereQ, function (err, data) {
    // console.log(data)
    if (data) { res.send(data) } else {
      res.send('no data found')
    }
  })
});



router.post('/login', function (req, res, next) {
  //console.log(req.body);
  let query = { ...req.body, status: 1 };
  console.log(query);
  memberCollection.findOne(query, function (err, data) {
    console.log(err, data)
    if (data) {
      console.log(data)
      res.send({ "Success": "Success!", data: data });
    } else {
      res.send({ "Success": "Wrong password!" });
    }
  });
});

module.exports = router;
