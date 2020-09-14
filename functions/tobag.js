var Mongoclient = require('mongodb').MongoClient;


import querystring from "querystring";


// var uri = "mongodb+srv://alex:alex@cluster0alex-mvffj.gcp.mongodb.net/my?retryWrites=true"; 


exports.handler = async (event, context, callback) => { 
        
    const uri = process.env.uri;   
    var d = new Date();    
    var date = d.getFullYear() +"/"+(d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()   ;
    const params = querystring.parse(event.body); 
       
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
        body: `Hello, ${name}`               
                      
    };    
                    
        
            
};
