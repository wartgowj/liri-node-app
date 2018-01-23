const dotenv = require('dotenv').config();


//const request = require('request');
const keys = require('./keys.js');




const command = process.argv[2];
const search = process.argv[3];

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
      throw error
  }
});
}

//'spotify-this-song' function
function getSong(){
	const Spotify = require('node-spotify-api');
	const spotify = new Spotify(keys.spotify);
	spotify.search({ type: 'track', query: search, limit:5 }, function(err, data) {
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

//'do-what-it-says' function