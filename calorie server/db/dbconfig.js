const { MongoClient } = require("mongodb");
const connectionString = process.env.MONGO_URI;
const dbName =  process.env.DATABASE_NAME;
const client = new MongoClient(connectionString+dbName, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = {
    dbConnection: client.connect(),
    db : client.db()
 
};





