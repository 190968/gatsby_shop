var Mongoclient = require('mongodb').MongoClient;
require('dotenv').config();
var cors = require('cors');
const express = require("express");


var uri = "mongodb+srv://alex:alex@cluster0alex-mvffj.gcp.mongodb.net/my?retryWrites=true"; 
const app = express()

app.use(cors())


exports.handler = (event, context, callback) => { 
       
       
       
        
        const model = event.queryStringParameters.model || "World";
      
        let name_model = new RegExp(model,"i"); 
        Mongoclient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(db =>  db.db("my").collection("base").find({model:  name_model }).project({"model":1}).toArray())
        .then(result =>  res.send(result))
        .then(db => db.close)
        .catch(error =>console.log(error));       
            
};
