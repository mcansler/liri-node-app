require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");
var fs = require('fs');


//argv[2] chooses users actions; argv[3] is input parameter, ie; song or movie title
var userCommand = process.argv[2];
var name = process.argv[3];

//concatenate multiple words in process.argv[3]
for (var i = 4; i < process.argv.length; i++) {
    name += '+' + process.argv[i];
}

var spotify = new Spotify(keys.spotify);

//Switch command

//choose which statement (userCommand) to switch to and execute
function Selection(userCommand) {
    switch (userCommand) {

        case "my-tweets":
            getTweets();
            break;

        case "spotify-this-song":
            getSpotify();
            break;

        case "movie-this":
            getMovie();
            break;

        case "do-what-it-says":
            doThing();
            break;

        default:
            console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
            break;
    }
}    


//Twitter - command: my-tweets
function getTweets() {

    var client = new Twitter(keys.twitter);

    var params = {screen_name: 'Jalon83324857'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var date = tweets[i].created_at;
                console.log("@Jalon83324857: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                //seperator
                console.log("-----------------------");

                //adds text to log.txt file
                fs.appendFile('log.txt', "@Jalon83324857: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                fs.appendFile('log.txt', "-----------------------");
            }
        } else {
            console.log('Error occurred');
        }
  
    });
}



// Function for running a Spotify search - Command is spotify-this-song
function getSpotify() {

    var songName = name;
    if (!songName) {
        songName = "The Sign";
    }
    
    //console.log(songName);
    spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songs = data.tracks.items;

        for (var i = 0; i < songs.length; i++) {

            //console.log(songs[i]);
            console.log("Artist(s): " + songs[i].artists[0].name);
            console.log("Song: " + songs[i].name);
            console.log("Preview Song: " + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name);
            console.log("-----------------------------------");

            //adds text to log.txt
            fs.appendFile('log.txt', songs[i].artists[0].name);
            fs.appendFile('log.txt', songs[i].name);
            fs.appendFile('log.txt', songs[i].preview_url);
            fs.appendFile('log.txt', songs[i].album.name);
            fs.appendFile('log.txt', "-----------------------");
        }
 
        //console.log(JSON.stringify(data,null, 2)); 

    });
};

//OMDB Movie - command: movie-this
function getMovie() {
    var movieName = name;
    // Run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    //console.log(movieName);

    request(queryUrl, function (error, response, body) {

        if (movieName === undefined) {

            
            console.log("-----------------------");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");

            //adds text to log.txt
            fs.appendFile('log.txt', "-----------------------");
            fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            fs.appendFile('log.txt', "It's on Netflix!");
            
        }

        // If the request is successful = 200
        else if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);

            //console.log(body);

            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Rotten Tomatoes URL: " + body.tomatoURL);

            //adds text to log.txt
            fs.appendFile('log.txt', "Title: " + body.Title);
            fs.appendFile('log.txt', "Release Year: " + body.Year);
            fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
            fs.appendFile('log.txt', "Country: " + body.Country);
            fs.appendFile('log.txt', "Language: " + body.Language);
            fs.appendFile('log.txt', "Plot: " + body.Plot);
            fs.appendFile('log.txt', "Actors: " + body.Actors);
            fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
            fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);


        } else {
            //else - throw error
            console.log("Error occurred.")
        }
        //Response if user does not type in a movie title
        
    });
}

function doThing(){
    fs.readFile('random.txt', "utf8", function(error, data){
        if (!error);
        //console.log(data.toString());
        //split text with comma delimiter
        var dataArr = data.toString().split(',');
        //console.log(dataArr[0]);
        userCommand = dataArr[0];
        name = dataArr[1];
        Selection(userCommand);
    });
}

Selection(userCommand);
