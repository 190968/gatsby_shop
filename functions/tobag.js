var Mongoclient = require('mongodb').MongoClient;








exports.handler = async (event, context, callback) => { 
        
    const uri = process.env.uri;   
    var d = new Date();    
    var date = d.getFullYear() +"/"+(d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()   ;
   
    const params = JSON.parse(event.body);   
    var connect = await Mongoclient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
           
            var set = {
                date: date,           
                person: {
                "name": params.name,
                "phone": params.phone,
                "email": params.email
                },
                "delivery": params.delivery,
                "bag": params.bag,       
                "status": 1
            };
    var dbo = await connect.db("my").collection("urls").insertOne(set);
            
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type" :"Application/json",
            "Access-Control-Allow-Methods": "OPTIONS,GET"
        },
        body: `Hello, ${params.name}`               
                      
    };    
                    
        
            
};
