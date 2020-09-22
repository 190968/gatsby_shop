var Mongoclient = require('mongodb').MongoClient;

exports.handler = async (event, context, callback) => {        
 
  const env = process.env.uri;

  var s = await Mongoclient.connect(env, { useNewUrlParser: true, useUnifiedTopology: true });
  var m = await s.db("my").collection("urls").find({}).toArray();  
  console.log(m.length);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type" :"Application/json",
      "Access-Control-Allow-Methods": "OPTIONS,GET"
  },       
    body: `${JSON.stringify(m)}`
  }            
};
