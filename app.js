// Connect to express js
var express = require("express");
app = express();



// body encoded url
app.use(express.urlencoded({extended:true}));

// Port for server
const PORT = 3000;



// Home Page Route
app.get("/", function(req, res){
    res.render("index");
    
});
