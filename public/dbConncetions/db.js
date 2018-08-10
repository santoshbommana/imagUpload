

var request = require("request");
var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient;

var DB_HOST = "mongodb://127.0.0.1:27017/",
    DB_NAME ="studio",
    DB_HOME_PAGE_COLLECTION ="studioImages",
    DB_ALL_IMAGES_COLLECTION ="allImages",
    DB_BLOG_COLLECTION = 'blog',
    DB_CONTACT_COLLECTION ="contact",
    DATA,SOTRE_COLLECTION;	
   


module.exports={
     
                    
	storeImageData:function (storeData,callback) {
		  
		//console.log(storeData)

		   if(storeData.type == "contact"){
			   DATA = storeData;
			   SOTRE_COLLECTION =DB_CONTACT_COLLECTION;   
		   }
		   else if(storeData.textFeild.type == "specialImages"){
			   DATA = storeData;
			   SOTRE_COLLECTION =DB_HOME_PAGE_COLLECTION;
			   }
		   else if (storeData.textFeild.type == "allImages"){
			   DATA = storeData;
			   SOTRE_COLLECTION =DB_ALL_IMAGES_COLLECTION;
			   
		   } 
		   else{
			   DATA = storeData;
			   SOTRE_COLLECTION =DB_BLOG_COLLECTION;
		   }
    
        createNewDocument(DATA, DB_NAME,SOTRE_COLLECTION, function (err, result) {
            if (err) {
                callback("Failed to create doc  : " + SOTRE_COLLECTION);
            }
            else {
                //console.log("result",result);
                callback(null, result);
            }
        });
    },
    getAllData: function (callback) {
        getAllDocsFromDatabase(DB_NAME,DB_HOME_PAGE_COLLECTION, function (err, result) {
            if (err) {
                callback("Failed to get home page(special Records) the documents from database: " + DB_NAME +  DB_HOME_PAGE_COLLECTION);
            }
            else {
                callback(null, result);
            }
        });
    },
    getAllImagesRecords:function (callback) {
        getAllDocsFromDatabase(DB_NAME,DB_ALL_IMAGES_COLLECTION, function (err, result) {
            if (err) {
                callback("Failed to get all images the documents from database: " + DB_NAME +  DB_ALL_IMAGES_COLLECTION);
            }
            else {
                callback(null, result);
            }
        });
    },
    getBlogRecords:function (callback) {
        getAllDocsFromDatabase(DB_NAME,DB_BLOG_COLLECTION, function (err, result) {
            if (err) {
                callback("Failed to get blog records the documents from database: " + DB_NAME +  DB_BLOG_COLLECTION )           }
            else {
                callback(null, result);
            }
        });
    },
	
    getContactRecords:function (callback) {
        getAllDocsFromDatabase(DB_NAME,DB_CONTACT_COLLECTION, function (err, result) {
            if (err) {
                callback("Failed to get contact records the documents from database: " + DB_NAME +  DB_CONTACT_COLLECTION )           }
            else {
                callback(null, result);
            }
        });
    },

};


function createNewDocument(data, dataBase,collection, callback) {
	let message,res;
	MongoClient.connect(DB_HOST, function(err, db) {
		  
		  var dbo = db.db(dataBase);
		  var myobj = data;

		  dbo.collection(collection).insert(myobj, function(err, res) {
		    if (err){ 
		    	 throw err;
		    	 message = "Oops!.. somthing went wrong " + err;
		    	 callback(null, message);
		    	 } else{
		    		message =  "1 document inserted " + dataBase + collection;
		 		    //console.log(message);
		 		     if( res.result.ok == 1){
		 		    	    //console.log("inside if ");
		 		    	 res ={
		 		    			statusCode:201,
		 		    			statusMessage:"Data submitted successfully."
		 		    	 }
		 		    	 callback(null,res);
		 		     }
		 	       
		 	         
		    	 };
		    	 db.close();
		     }); 
		 });

};


function getAllDocsFromDatabase(database,collection, callback) {
	let res;
	MongoClient.connect(DB_HOST, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db(database);
		  dbo.collection(collection).find().toArray(function(e, body) {
	            //console.log(body.length);
	             if( body.length !== 0 ){
	            	 res ={
			    			  statusCode:200,
			    			  statusMessage:'ok'
			    	  };
			    	callback(null ,buildReturnJson(body,res));
			    	
	             }else{
	            	 res ={
	            			  statusCode:404,
			    			  statusMessage:'Object Not Found'
			    	  };
	            	 //console.log("hited",res);
	            	 callback(null ,buildReturnJson(body,res));
	             }
	            
	            db.close();
	        });
		  });
};

function buildReturnJson(body, response) {
    var toReturn = {
        "body": body,
        "statusCode": response.statusCode,
        "statusMessage": response.statusMessage
    };
    return toReturn;
}




