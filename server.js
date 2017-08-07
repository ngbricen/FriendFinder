var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


var app = express();
var PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(path.join(__dirname, 'app/public')));


// tables array of objects
var friends = [{
	name: "Richard",
	url: "https://pixabay.com/en/cary-grant-actor-man-person-392916/",
	q1: 2,
	q2: 3,
  q3: 2,
  q4: 3,
  q5: 2,
  q6: 3,
  q7: 2,
  q8: 3,
  q9: 2,
  q10: 3
},
{
  name: "Gigi",
  url: "https://pixabay.com/en/pirate-actor-costume-portrait-2442489/",
  q1: 2,
  q2: 4,
  q3: 5,
  q4: 3,
  q5: 2,
  q6: 1,
  q7: 2,
  q8: 1,
  q9: 2,
  q10: 0
}];

// array to hold the list of tables waitlisted
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.get("/api/friends", function(req, res) {
  res.json(friends);
});


app.post("/api/new", function(req, res) {
  var newSurvery = req.body;

  console.log(newSurvery);

  friends.push(newSurvery);

  res.json(newSurvery);
});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});