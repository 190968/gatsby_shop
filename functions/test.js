
var cors = require('cors');
const express = require("express");


var uri = "mongodb+srv://alex:alex@cluster0alex-mvffj.gcp.mongodb.net/my?retryWrites=true"; 
const app = express()

app.use(cors())
exports.handler = (event, context, callback) => {
  const name = event.queryStringParameters.name || "World";
  callback(null, {
    statusCode: 200,
    body: `No worries, ${name},  all is working fine!`
  })
}