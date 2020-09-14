var Mongoclient = require('mongodb').MongoClient;
exports.handler = async (event, context, callback) => { 
var uri = "mongodb+srv://alex:alex@cluster0alex-mvffj.gcp.mongodb.net/my?retryWrites=true";        
       
  let env = process.env.uri;
  console.log(env);     
  const name = event.queryStringParameters.name;
  const phone = event.queryStringParameters.phone;
        
        
  var s = await Mongoclient.connect(env, { useNewUrlParser: true, useUnifiedTopology: true });
  var d =  await s.db("my").collection("urls").find({"person.name" : name, "person.phone": phone }).toArray();

          

  return {
    statusCode: 200,
    body: `${d}`
  };
            
                 
        
    
            
};