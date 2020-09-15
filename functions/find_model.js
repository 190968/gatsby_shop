var Mongoclient = require('mongodb').MongoClient;





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
    console.log(mod.length);
    const model_all = [...new Set(mod)];
    return {
        statusCode: 200,
        body: `${model_all}`
    };
            
};
