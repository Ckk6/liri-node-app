

var  twit = require('./keys.js');
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: twit.twitterKeys.consumer_key,
  consumer_secret: twit.twitterKeys.consumer_secret,
  access_token_key: twit.twitterKeys.access_token_key,
  access_token_secret: twit.twitterKeys.access_token_secret
});
//console.log('this is ',Twitter);
//var twitterAPI = require('node-twitter-api');
var select = process.argv[2];
var tune = process.argv;


console.log (twit.twitterKeys.consumer_key);
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

function songs(tune){
	var spotify = require('spotify');
	opera = tune.splice(0,3);
	console.log('opera is ' + opera) ;
	console.log('tune is ' + tune);
	song= "'";
	
	for (var i=0; i<tune.length; i++){
		song+=tune[i]
		if (i != tune.length - 1){
			song+=" "
		}
	}
	song += "'"
	console.log('this is '+ song);


 
		spotify.search({ type: 'track', query: song }, function(err, data) {
    		if ( err ) {
        		console.log('Error occurred: ' + err);
        return;
    } else{
    	console.log(data);
    }
 
    // Do something with 'data' 
});
}

switch(select) {
	case 'my-tweets':
		//console.log('my-tweets selected');
		//var params = {screen_name: '@1undaunted1', count:20};
		//client.get('statuses/user_timeline', params, function(error, tweets, response){
  				//if (!error) {
   				 //console.log(tweets);
   		twitt(client);
   		break;
  							//}
		//});
		

	case 'spotify-this-song':
		console.log('spotify-this-song selected');
		songs(tune);
		break;

	case 'movie-this':
		console.log('movie-this selected');
		break;

	case 'do-what-it-says':
		console.log('do-what-it-says selected');
		break;



}