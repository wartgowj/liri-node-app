const dotenv = require('dotenv').config();

const keys = require('./keys.js');

const command = process.argv[2];
var search = process.argv[3];

switch(command) {
  case 'my-tweets': 
    getTweets();
    break;
  case 'spotify-this-song':
    getSong(search);
    break;
  case 'movie-this':
    getMovie(search);
    break;
  case 'do-what-it-says':
    doWhatever();
    break;
  default: {
    console.log('invalid input!!!')
  }
}


//'my-tweets' function
function getTweets(){
	const Twitter = require('twitter');
	const client = new Twitter(keys.twitter);
	var params = {screen_name: 'wartgowj'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
  		for (i = 0; i < tweets.length; i++){
      	console.log(tweets[i].text);
      	console.log(tweets[i].created_at);
      	console.log("-------------------------------------------------");
 	 }
  	} else {
      console.log(error);
      return;
  	}
	});
}

//'spotify-this-song' function
function getSong(){
	const Spotify = require('node-spotify-api');
	const spotify = new Spotify(keys.spotify);
  if(!search){
    search = "hail to the king";
  }
	spotify.search({ type: "track", query: search}, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  }
 
	console.log(JSON.stringify("Artist:" + " " + data.tracks.items[0].artists[0].name, null, 2));
	console.log(JSON.stringify("Title:" + " " + data.tracks.items[0].name, null, 2));
	if(data.tracks.items[0].preview_url){
	console.log(JSON.stringify("Preview:" + " " + data.tracks.items[0].preview_url, null, 2));
	}else{
		console.log("Sorry, No Preview Available")
	}
	console.log(JSON.stringify("Album:" + " " + data.tracks.items[0].album.name, null, 2));
	});
}	

//'movie-this' function
function getMovie(){
	if(!search){
		search = "mr nobody"
	}
	const request = require('request');{
		request("http://www.omdbapi.com/?apikey=trilogy&t=" + search + "", function (error, response, body) {
  			if (error) {
   			 	throw error
  			} else {
   				 const results = JSON.parse(body);
   				 console.log("Title:" + " " + results.Title);
   				 console.log("Year:" + " " + results.Year);
   				 console.log("IMDB Rating:" + " " + results.imdbRating);
   				 console.log("Rotten Tomatoes:" + " " + results.Ratings[1].Value);
   				 console.log("Produced in:" + " " + results.Country);
   				 console.log("Language:" + " " + results.Language);
   				 console.log("Plot:" + " " + results.Plot);
   				 console.log("Actors:" + " " + results.Actors);

  			}
		});
	}
}

//'do-what-it-says' function
function doWhatever(){
  const fs = require('fs');
  fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }
  var dataArr = data.split(",");

  switch(dataArr[0]) {
  case 'spotify-this-song':
    search = dataArr[1]
    getSong(search);
    break;
  case 'movie-this':
    search = dataArr[1]
    getMovie(search);
    break;
  default: {
    console.log('invalid input!!!')
  }
}

});
}
