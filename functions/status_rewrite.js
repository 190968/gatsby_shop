var Mongoclient = require('mongodb').MongoClient;

exports.handler = async (event, context, callback) => {        
       
     var uri = process.env.uri;        
    const status = event.queryStringParameters.status;
    const date =   event.queryStringParameters.date;   

    var s = await Mongoclient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    var d =  await s.db("my").collection("base").updateOne({date: date},{$set: {'status': +status}});

    
    return {
        statusCode: 200,
        body: "Rewrite OK"
    };
            
};
