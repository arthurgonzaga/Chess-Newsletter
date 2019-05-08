const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req, res){
    var firstname = req.body.firstName;
    var surname = req.body.surname;
    var email = req.body.email;
    console.log(`${firstname} ${surname} - ${email}`);
});

app.listen(3000, function(){
    console.log("Running on port 3000")
});