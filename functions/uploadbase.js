const excelToJson = require('convert-excel-to-json');
const axios = require("axios");
const Mongoclient = require('mongodb').MongoClient;


exports.handler = async (event, context) => {
  let s = await axios.get("https://api.github.com/repos/superHotBob/image/contents/base3.xls");
 
  const result = excelToJson({   
    source: s.data.content,
    header:{
      rows: 1
    },
    columnToKey: {
      A: 'id',
      B: 'cost',
      C: 'brand',
      D: 'model',
      E: 'gender',
      F: 'size',
      G: 'color',
      H: 'item',
      I: 'rev',
      J: 'sale'
    }
  });
 
  var uri = "mongodb+srv://alex:alex@cluster0alex-mvffj.gcp.mongodb.net/my?retryWrites=true";   
  var connect = await Mongoclient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
           
  const del = await connect.db("my").collection("base").deleteMany();         
  const dbo = await connect.db("my").collection("base").insertMany(result.Лист1);
  console.log("Base add ok");
    return {
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type" : "application/json",
          "Access-Control-Allow-Methods": "OPTIONS,POST"
      },
      body: "Good upload base"                   
    };
  

};  

