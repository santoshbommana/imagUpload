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
var multer = require('multer'),
    path = require('path');

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


// this for image  updalod code not more than 50 MB 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


//our Angular code is sending JSON data, but your Express app is parsing it as URL encoded data.
app.use(bodyParser.json());
var db = require('./public/dbConncetions/db.js');


//image Validation
//Set The Storage Engine
const storage = multer.diskStorage({
destination: './public/uploads/',
filename: function(req, file, cb){
 cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));

}
});
//Init Upload
const upload = multer({
storage: storage,
/*limits:{fileSize: 1000000},*/
fileFilter: function(req, file, cb){
 checkFileType(file, cb);
}
}).single('image');


//Check File Type
function checkFileType(file, cb){
// Allowed ext
const filetypes = /jpeg|jpg|png|gif/;
// Check ext
const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
// Check mime
const mimetype = filetypes.test(file.mimetype);

if(mimetype && extname){
 return cb(null,true);
} else {
 cb('Error: Images Only!');
}
}

//store images 
var imageData;
app.post('/upload', (req, res) => {
	
	//console.log(res.file); 
	
upload(req, res, (err) => {
 if(err){
   res.send(err);
       } else {
   if(req.file == undefined){
     res.send('Error: No File Selected!');
      
   } else {
 	  
 	     	   	 imageData = req.file;
 		    	 //console.log("Only File saved",req.file);
 		    	 res.send(201);        
   }
  
 }
});
});


app.post('/sendToDB',function(req,res){ 
	 var data = {
		  textFeild : req.body,
		  image:imageData
	 };
	 //console.log(data);
	  
    db.storeImageData(data,function(err,result){
            console.log(result.statusCode);
            res.send(result);    
    });

});


app.get("/getAllRecords",function(req,res){

    db.getAllData(function(err,result){
            //console.log(result);
            res.send(result);       
     });
});
app.get("/allImagesDb",function(req,res){

    db.getAllImagesRecords(function(err,result){
            //console.log(result);
            res.send(result);       
     });
});

app.get("/getBlogDb",function(req,res){

    db.getBlogRecords(function(err,result){
            //console.log(result);
            res.send(result);       
     });
});
app.get("/getContactDb",function(req,res){

    db.getContactRecords(function(err,result){
            //console.log(result);
            res.send(result);       
     });
});


app.post('/sendContact',function(req,res){ 
	   //console.log("req",req.body);
    db.storeImageData(req.body,function(err,result){
            //console.log(result);
            res.send(result);    
    });

});


app.post("/login",function(req,res){
    
     var responseSendBack = (req.body.userName === "swetha" && req.body.password === "admin") ?  res.send(true): res.send(false);
    

});

app.set('port',80);
app.set('host','202.53.87.43');

/*app.set('port',3000);
app.set('host','localhost');*/

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('host') + ':' + app.get('port'));
});


