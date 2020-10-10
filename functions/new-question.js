var Mongoclient = require('mongodb').MongoClient;

exports.handler = async (event, context) => {
  
 
    
  
    const uri = process.env.uri;   
    var d = new Date();    
    var date = d.getFullYear() +"/"+(d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()   ;
  
    const params = JSON.parse(event.body);
    
   
   
    console.log(`questions send ${params.name}`);
    var connect = await Mongoclient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
           
            var set = {
                "date": date,             
                "name": params.name,
                "phone": params.phone,
                "email": params.email,               
                "question" : params.question,
                
            };
    var dbo = await connect.db("my").collection("questions").insertOne(set);
            
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST"
      },
      body: "Hello, Bob"               
                    
    }
}

