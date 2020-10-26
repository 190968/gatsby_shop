const excelToJson = require('convert-excel-to-json');
const axios = require("axios");
const Mongoclient = require('mongodb').MongoClient;


exports.handler = async (event, context) => {
  let s = await axios.get("https://api.github.com/repos/superHotBob/image/contents/shoes3.xls");
  
  const result = excelToJson({   
    source: s.data.content,
    columnToKey: {
      A: 'id',
      B: 'cost',
      C: 'size',
      D: 'color',
      E: 'gender',
      F: 'model'
    }
  });
  var uri = "mongodb+srv://alex:alex@cluster0alex-mvffj.gcp.mongodb.net/my?retryWrites=true";   
  var connect = await Mongoclient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
           
           
  const dbo = await connect.db("my").collection("test").insertMany(result.shoes3);
  console.log(dbo.result.insertedCount);

    return {
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type" : "multipart/form-data",
          "Access-Control-Allow-Methods": "OPTIONS,POST"
      },
      body: "Return"                   
    };
  

};  
