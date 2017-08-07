var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var $ = require('jquery');


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


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

// // Get all characters
// app.get("/all", function(req, res) {
//   res.json(characters);
// });

app.get("/api/friends", function(req, res) {
  res.json(friends);
});


app.post("/api/friends", function(req, res) {
  var newSurvey = req.body;

  console.log(newSurvey);

  compareFriends(newSurvey);

  friends.push(newSurvey);

  res.json(newSurvey);
});


function compareFriends(newFriend){
  //Starting the counter at 10000 as the minimum value to ensure that the first run will get the min value
  var minDifference = 10000;
  var sumDifference = 0;
  var friendMatch = [];

  //loop throuh the list of friends
  for ( var key in friends) {
    if ( Object.prototype.hasOwnProperty.call(friends, key) ) {

      //Compare values between friends and new survey (new friend)
      sumDifference = Math.abs(parseInt(friends[key]["q1"]) - parseInt(newFriend["q1"]))
                    + Math.abs(parseInt(friends[key]["q2"]) - parseInt(newFriend["q2"]))

      //If closer match, need to capture user and picture
      if (sumDifference <= minDifference){
        minDifference = sumDifference;
        friendMatch.push(friends[key]["name"],friends[key]["url"]);
      }
    }
  }
  return friendMatch;
}

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});