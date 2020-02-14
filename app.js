// Connect to express js
var express = require("express");
app = express();



// body encoded url
app.use(express.urlencoded({extended:true}));

// Port for server
const PORT = 3000;


var chosen = ["CSC343", "CSC369"];
var result;

// Home Page Route
app.get("/", function(req, res){
    db.collection("cobalt").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.render("index", {result:result, chosen:chosen});
    });  
});
