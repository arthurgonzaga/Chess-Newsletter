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

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: surname
                }
            }
        ]
    }
    var bodyData = JSON.stringify(data);
    var option = {
        url: 'https://us20.api.mailchimp.com/3.0/lists/385c95703e',
        method: "POST",
        headers: {
            "Authorization": "arthur 3ec9984379359c168f4b28b2a1ab5dbe-us20",
        },
        body: bodyData
    }


    request(option, function(error, response, body){
        console.log(`response code: ${response.statusCode}`);
        if(error){
            res.sendFile(__dirname + "/failure.html");
        }else{
            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            }else{
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });
});

app.listen(3000, function(){
    console.log("Running on port 3000")
});