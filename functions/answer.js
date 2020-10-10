const Mongoclient = require('mongodb').MongoClient;
const nodemailer = require("nodemailer");
exports.handler = async (event, context, callback) => {         
    const uri = process.env.uri;   
    // var d = new Date();    
    // var date = d.getFullYear() +"/"+(d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()   ;
   
    const params = JSON.parse(event.body);   
    var connect = await Mongoclient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
           
            var set = {
                $set: { "answer": params.answer }        
            };
            var filter = { "email": params.email  };                      
                                        
           
    var dbo = await connect.db("my").collection("question").updateOne(filter,set);
    async function main() { 
        const transporter = nodemailer.createTransport({
          service: 'gmail',   
          auth: {
              user: '19ham09@gmail.com',
              pass: body.password
          }        
        });
    
        var eventEmitter = new events.EventEmitter();
          eventEmitter.on('data_received', function() {
          console.log('data received succesfully.');
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: 'e-shop', // sender address
          to: body.email, // list of receivers
          subject: "Message from e-shop aplacadance.ru", // Subject line
          text: body.details, // plain text body
          html: `<!doctype html>
                  <html>
                    <head>
                      <meta charset="utf-8">
                      
                    </head>
                    <body>
                    <h1>Hello ${body.name}</h1>
                  <h3>On your question  <ins>${body.question}</ins>, we answering.</h3>
                  <p>${body.details}</p>
                      <p>Image: <img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
                     
                        <p><img src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
                    </body>
                </html>`
        });
        eventEmitter.emit('data_received');
        console.log("Message sent: %s", info.messageId);
      };
      main();
             
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
