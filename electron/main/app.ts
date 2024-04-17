var express = require("express");
var app = express();

var request = require("request");

app.set("view engine", "ejs");
//@ts-ignore
app.get("/", function(req, res) {
    res.render("search");
});
//@ts-ignore
app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "https://yts.am/api/v2/list_movies.json?sort=seeds&limit=15&query_term='" + query + "'";
    //@ts-ignore
    request(url, function(error, response, body){
        var data = JSON.parse(body);
        if(!error && response.statusCode == 200){
            //res.send(data["data"]["movies"][0]["title"]);
            res.render("results", {data: data});
            //["movies"][0]["title"]
        }
        else
        console.log(data);
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("IMDB server has started");
});