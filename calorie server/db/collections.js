var {db} = require('./dbconfig');
const { bmrCalculation } = require('./validator');

module.exports ={ 
    foodCollection : db.collection('foods'),
    activityCollection : db.collection('activities'),
    memberCollection :db.collection('Members'),
    bmrCollection:db.collection('bmr'),
    addFoodCollection:db.collection('UserFoodData'),
    addActivityCollection:db.collection('UserActivityData')
}