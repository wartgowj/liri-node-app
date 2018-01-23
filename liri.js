const dotenv = require('dotenv').config();
//const twitter = require('twitter');
const Spotify = require('node-spotify-api');
//const request = require('request');
const keys = require('./keys.js');

const spotify = new Spotify(keys.spotify);
//const client = new Twitter(keys.twitter);

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

//'spotify-this-song' function
function getSong(){
	spotify.search({ type: 'track', query: search, limit:1 }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  }
 
	console.log(JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
	console.log(JSON.stringify(data.tracks.items[0].name, null, 2));
	if(data.tracks.items[0].preview_url){
	console.log(JSON.stringify(data.tracks.items[0].preview_url, null, 2));
	}else{
		console.log("Sorry, No Preview Available")
	}
	console.log(JSON.stringify(data.tracks.items[0].album.name, null, 2));
	});
}	

//'movie-this' function

//'do-what-it-says' function