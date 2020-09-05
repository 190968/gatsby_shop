var Mongoclient = require('mongodb').MongoClient;
require('dotenv').config();
var cors = require('cors');
const express = require("express");
var bodyParser = require('body-parser');

var uri = "mongodb+srv://alex:alex@cluster0alex-mvffj.gcp.mongodb.net/my?retryWrites=true"; 
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

exports.handler = (event, context, callback) => { 
        // Only allow POST
        if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
        }     
        var d = new Date();    
        var date = d.getFullYear() +"/"+(d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()   ;
        const params = querystring.parse(event.body);
        const name_my = event.queryStringParameters.name || "World";
        console.log(name_my);
        const name = params.name;
        Mongoclient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true },function(err, db){
            if ( err ) throw err;
            var set = {
                date: date,           
                person:{
                "name": params.name,
                "phone": params.phone,
                "email": params.email
                },
                "delivery": params.delivery,
                "bag": params.bag,       
                "status": 1
            };
            var dbo = db.db("my");       
            dbo.collection("urls").insertOne(set,(err,data) => {
            if ( err ) {
                res.send(err)
            } else {       
                return {
                    statusCode: 200,
                    body: `Hello, ${name}`
                  };
                db.close();          
            }    
            });           
        });
            
};
