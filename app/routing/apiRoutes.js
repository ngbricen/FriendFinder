var server = require("../../server.js");

var friends = server.friendsList;
var friendMatch = server.friendMatchList;

module.exports = function(app){

	app.get("/api/friends", function(req, res) {
	  res.json(friends);
	});


	app.post("/api/new", function(req, res) {
		var newSurvey = req.body;

		console.log(newSurvey);
		
		//Compare friends
		compareFriends(newSurvey);

		friends.push(newSurvey);

		// res.json(newSurvey);

		  // When the request has ended...
		req.on("end", function() {
			res.write("<html><head><title>Hello Noder!</title></head><body>");
			res.write("<h1>Thank You!</h1>");
			res.write("</body></html>");
			res.end();
		});
	});

	function compareFriends(newFriend){
  		//Starting the counter at 10000 as the minimum value to ensure that the first run will get the min value
		var minDifference = 10000;
		var sumDifference = 0;

		//loop throuh the list of friends
		for ( var key in friends) {
			if ( Object.prototype.hasOwnProperty.call(friends, key) ) {

			  //Compare values between friends and new survey (new friend)
			  sumDifference = Math.abs(parseInt(friends[key]["q1"]) - parseInt(newFriend["q1"]))
			                + Math.abs(parseInt(friends[key]["q2"]) - parseInt(newFriend["q2"]))
			                + Math.abs(parseInt(friends[key]["q3"]) - parseInt(newFriend["q3"]))
			                + Math.abs(parseInt(friends[key]["q4"]) - parseInt(newFriend["q4"]))
			                + Math.abs(parseInt(friends[key]["q5"]) - parseInt(newFriend["q5"]))
			                + Math.abs(parseInt(friends[key]["q6"]) - parseInt(newFriend["q6"]))
			                + Math.abs(parseInt(friends[key]["q7"]) - parseInt(newFriend["q7"]))
			                + Math.abs(parseInt(friends[key]["q8"]) - parseInt(newFriend["q8"]))
			                + Math.abs(parseInt(friends[key]["q9"]) - parseInt(newFriend["q9"]))
			                + Math.abs(parseInt(friends[key]["q10"]) - parseInt(newFriend["q10"]))

			  //If closer match, need to capture user and picture
			  if (sumDifference <= minDifference){
			    minDifference = sumDifference;
			    friendMatch.push(friends[key]["name"],friends[key]["url"]);
			  }
			}
		}
		return friendMatch;
		}
	}