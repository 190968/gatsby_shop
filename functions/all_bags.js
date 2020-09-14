var Mongoclient = require('mongodb').MongoClient;

exports.handler = async (event, context, callback) => {        
  var uri = "mongodb+srv://alex:alex@cluster0alex-mvffj.gcp.mongodb.net/my?retryWrites=true";
  const env = process.env.uri;

  var s = await Mongoclient.connect(env, { useNewUrlParser: true, useUnifiedTopology: true });
  var m = await s.db("my").collection("urls").find({}).toArray();  
  console.log(m.lenght);
  return {
    statusCode: 200,       
    body: `${m}`
  }            
};
