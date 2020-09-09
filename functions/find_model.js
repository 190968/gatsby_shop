var Mongoclient = require('mongodb').MongoClient;



var uri = "mongodb+srv://alex:alex@cluster0alex-mvffj.gcp.mongodb.net/my?retryWrites=true"; 


exports.handler = (event, context, callback) => { 
       
       
       
        
        const model = event.queryStringParameters.model ;
      
        let name_model = new RegExp(model,"i"); 
        var s = Mongoclient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        var d =   s.db("my").collection("base").find({model:  name_model }).project({"model":1}).toArray();
       
        
        
       return {
            statusCode: 200,
            body: `${d}`
          };
            
};
