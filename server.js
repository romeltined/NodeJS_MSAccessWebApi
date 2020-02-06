//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express(); 
var ADODB = require('node-adodb');
ADODB.debug = true;

// Connect to the MS Access DB
var connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\nodejs\\nodejswebapi\\accessdata.accdb;Persist Security Info=False;');

// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });


//Function to connect to database and execute query
var  executeQuery = function(res, query){             
 
		// Query the DB
		connection
		  .query(query)
		  .then(data => {
			res.send(JSON.stringify(data, null, 2));
		  })
		  .catch(error => {
			res.send(error);
		  });
 
}


//Function to connect to database and execute query
var  executeSQL = function(res, query){             
 
		// Query the DB
		connection
		  .execute(query, 'SELECT @@Identity AS id')
		  .then(data => {
			res.send(JSON.stringify(data, null, 2));
		  })
		  .catch(error => {
			res.send(error);
		  });
 
}


//GET API
app.get("/api/user", function(req , res){
                var query = "select * from [TestTable]";
                executeQuery (res, query);
});


//node "C:\nodejs\nodejswebapi\server.js"


//POST API
 app.post("/api/user", function(req , res){
                var query = "INSERT INTO [TestTable](Field1,Field2) VALUES (" + '"' + req.body.Field1 + '"' + "," + '"' + req.body.Field2 + '"' + ")";
                executeSQL (res, query);
});

//PUT API
 app.put("/api/user/:id", function(req , res){
                var query = "UPDATE [TestTable] SET Field1= " + '"' + req.body.Field1 + '"' + ", Field2="  + '"' + req.body.Field2 + '"' +  "  WHERE Id= " + req.params.id;
                executeSQL (res, query);
});

// DELETE API
 app.delete("/api/user/:id", function(req , res){
                var query = "DELETE FROM [TestTable] WHERE Id=" + req.params.id;
                executeSQL (res, query);
});