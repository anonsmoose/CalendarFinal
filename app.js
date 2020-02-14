// Connect to express js
var express = require("express");
app = express();



//css folder
app.use(express.static("public"));


// body encoded url
app.use(express.urlencoded({extended:true}));

// Port for server
const PORT = 3000;

// Connect to mongoDB
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://masroor6:syntaxgroup1@cluster0-aupxl.mongodb.net/test?retryWrites=true&w=majority";

var db;

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
	db = client.db("syntax");
	if (err) return console.log(err);
	app.listen(PORT, () => {
		console.log('listening on ' + PORT);
	});
});

var chosen = ["CSC343", "CSC369"];
var result;

// Home Page Route
app.get("/", function(req, res){
    db.collection("cobalt").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.render("index", {result:result, chosen:chosen});
    });
});

//Post route for searching courses
app.post("/",function(req,res){
	chosen.push(req.body.course);
	console.log(req.body.course)

	db.collection("cobalt").find({}).toArray(function(err,result){
		if (err) throw err;
		res.render("index",{result:result,chosen:chosen});
	});
});
