

var twit = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var filename = ('./random.txt');
var omdb = require('omdb');
var client = new Twitter({
  consumer_key: twit.twitterKeys.consumer_key,
  consumer_secret: twit.twitterKeys.consumer_secret,
  access_token_key: twit.twitterKeys.access_token_key,
  access_token_secret: twit.twitterKeys.access_token_secret
});
//console.log('this is ',Twitter);
//var twitterAPI = require('node-twitter-api');
var select = process.argv[2];
var specify = process.argv;
var fileopt = false;

choice();

//========================================================================
//console.log (twit.twitterKeys.consumer_key);

 function twitt(client){
 	console.log('my-tweets selected'); 
 	console.log(client);
		var params = {screen_name: '@1undaunted1', count:20};
		client.get('statuses/user_timeline', params, function(error, tweets, response){
  				if (!error) {
  				console.log('we have data');
   				 console.log(tweets);
  							}
		});
 }

//========================================================================================

 function songmovieprep(second){
 	//console.log('fileopt', fileopt);
 	if (fileopt == false){
 		console.log(fileopt);
 	//console.log('I am in songmovieprep')
 	opera = second.splice(0,3);
	//console.log('opera is ' + opera) ;
	//console.log('second is ' + second);
	//console.log('second.length ' + second.length)
	name= "'";
	if (second.length != 0){
		for (var i=0; i<second.length; i++){
			name += second[i];
			if (i != second.length - 1){
				name += " "; 

			}
		}
		name += "'";
		//console.log('this is '+ name);
	}else {
		name = null;
	}	
}else{
name = specify;
}
}


//=======================================================
function songs(song){
	
	if (song === null){
		song ='what\'s my age again ';
	}
	
		spotify.search({ type: 'track', query: song, limit:1}, function(err, data) {
    		if ( err ) {
        		console.log('Error occurred: ' + err);
        return;
    } else{

    	//console.log(JSON.stringify(data));
    	//console.log(JSON.stringify(data, undefined, 2));
    	//console.log(" is it album: " + data.tracks.items[0].album.album_type);
    	console.log('=====================================================')
    	console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
    	console.log("Song Name: " + song);
    	console.log("Spotify Preview Link: " + data.tracks.items[0].preview_url);
    	console.log("Album Name: " + data.tracks.items[0].album.name);
    	console.log('=====================================================')
    }

 
   });
}

//====================================================================
	function theatre(movie){
		if (movie === null){
			movie = 'Mr. Nobody'
		}

		omdb.get({ title: movie }, true, function(err, movie) {
    		if(err) {
        		return console.error(err);
    		}

    		if(!movie) {
        		return console.log('Movie not found!');
    		}

    		console.log('=====================================================================');
    		console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
    		for (var c = 0; c < movie.countries.length; c++){
    			console.log(movie.countries[c]);
    		}
    		console.log(movie.plot);
    		for (var m = 0; m < movie.actors.length; m++){
    			console.log(movie.actors[m]);
    		}
    		console.log('=====================================================================');
    
    	});
    }

//=========================================================================================
function fileoption(){
	// must pass 'utf8' as 2nd argument
	fs.readFile(filename, 'utf8', function(error,data){
  		if (error){
    		console.log('The error is '+ error);

  		}
  		else{
   			console.log(data);
   			var dataArray = data.split(',');
   			select = dataArray[0];
   			specify = dataArray[1];
    		fileopt = true;
   			choice();

			}
	});
}
//==========================================================================================
function choice(){
	//console.log(select);
switch(select) {
	case 'my-tweets':
		twitt(client);
   		break;
		

	case 'spotify-this-song':
		songmovieprep(specify);
		songs(name);
		break;

	case 'movie-this':
		songmovieprep(specify);
		theatre(name);
		break;

	case 'do-what-it-says':
		fileoption();
		fileopt = false;
		break;

	default:
		console.log('That was not a valid request.  Please select from my-tweets spotify-this-song or movie-this.');




}
}