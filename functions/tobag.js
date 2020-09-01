var Mongoclient = require('mongodb').MongoClient;
require('dotenv').config();
const express = require("express");
var bodyParser = require('body-parser');

// app.use(bodyParser.json());
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

exports.handler = (event, context, callback) => {      
        var d = new Date();    
        var date = d.getFullYear() +"/"+(d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()   ;
    
        Mongoclient.connect(process.env.uri, { useNewUrlParser: true, useUnifiedTopology: true },function(err, db){
            if ( err ) throw err;
            var set = {
                date: date,           
                person:{
                "name": event.body.name,
                "phone": event.body.phone,
                "email": event.body.email
                },
                "delivery": event.body.delivery,
                "bag": event.body.bag,       
                "status": 1
            };
            var dbo = db.db("my");       
            dbo.collection("urls").insertOne(set,(err,data) => {
            if ( err ) {
                res.send(err)
            } else {       
                res.send("Ok");
                db.close();          
            }    
            });           
        });
            
};
