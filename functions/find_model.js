var Mongoclient = require('mongodb').MongoClient;



// var uri = "mongodb+srv://alex:alex@cluster0alex-mvffj.gcp.mongodb.net/my?retryWrites=true"; 


exports.handler = async (event, context, callback) => { 
       
       
     var uri = process.env.uri;  
        
    const model = event.queryStringParameters.model;
      
    let name_model = new RegExp(model,"i"); 

    var s = await Mongoclient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    var d =  await s.db("my").collection("base").find({"model" : name_model }).toArray();

    var mod = [];
    for(const i of d){
        mod.push(i.model);
    };
    console.log(mod);
    return {
        statusCode: 200,
        body: `${mod}`
    };
            
};
