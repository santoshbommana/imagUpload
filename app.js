/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();
var bodyParser = require('body-parser');

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// this for imge  updalod code not more than 50 MB 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


//our Angular code is sending JSON data, but your Express app is parsing it as URL encoded data.
app.use(bodyParser.json());
var db = require('./public/dbConncetions/db.js');


app.post('/sendToDB',function(req,res){ 
    
    db.storeImageData(req.body,function(err,result){
            //console.log(result);
            res.send(result);    
    });

});


app.get("/getAllRecords",function(req,res){

    db.getAllData(function(err,result){
            //console.log(result);
            res.send(result);       
     });
});
app.post("/login",function(req,res){
    
     var responseSendBack = (req.body.userName === "swetha" && req.body.password === "admin") ?  res.send(true): res.send(false);
    

});

// start server on the specified port and binding host
app.listen(80, '202.53.87.46', function() {
  //app.listen(3000, 'localhost', function() { // test locally
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});





