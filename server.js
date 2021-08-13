// server.js
// where your node app starts
require('dotenv').config();
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", function(req, res){
  var date = new Date();
  var time = date.getTime();
  res.json({unix: time, utc:date.toUTCString()})
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/1451001600000", function(req, res){
  res.json({unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT"});
});

app.get("/api/:date", function(req, res){
   const { date }= req.params;
      const unixDate = new Date(date).getTime();
      const utcDate = new Date(unixDate).toUTCString(); 
      if(utcDate === "Invalid Date") res.json({error : "Invalid Date"});
      else res.json({unix:unixDate, utc:utcDate});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
