require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var fs = require("fs");

var moment = require("moment");

var nodeArgs = process.argv;



// Bandsintown function
var concertThis = function (artist) {

    var artistName = "";

    for (i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            artistName = artistName + "+" + nodeArgs[i];
        }
        else {
            artistName += nodeArgs[i];
        }

    };

    bandsQueryURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp"

    axios.get(bandsQueryURL)
        .then(function (response) {
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city);
            console.log("Date: " + moment(response.data[0].datetime).format("MM-DD-YYYY"));
        })
        .catch(function (error) {
            console.log(error);
        });
};


// Spotify function
var spotifyThis = function () {

    var songTitle = "";

    for (i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            songTitle = songTitle + "+" + nodeArgs[i];
        }
        else {
            songTitle += nodeArgs[i];
        }

    };

    if (!songTitle) {

        spotify.search({ type: 'track', query: 'the sign ace of base' })
            .then(function (response) {

                console.log("Artist: " + response.tracks.items[0].artists[0].name);
                console.log("Song Title: " + response.tracks.items[0].name);
                console.log("Preview Link: " + response.tracks.items[0].preview_url);
                console.log("From the Album: " + response.tracks.items[0].album.name);

            })
            .catch(function (err) {

                console.log(err);

            });

    } else {

        spotify.search({ type: 'track', query: songTitle })
            .then(function (response) {

                console.log("Artist: " + response.tracks.items[0].artists[0].name);
                console.log("Song Title: " + response.tracks.items[0].name);
                console.log("Preview Link: " + response.tracks.items[0].preview_url);
                console.log("From the Album: " + response.tracks.items[0].album.name);

            })
            .catch(function (err) {

                console.log(err);

            });

    };

};


// OMDB Function
var movieThis = function (movie) {

    var movieTitle = "";

    for (i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            movieTitle = movieTitle + "+" + nodeArgs[i];
        }
        else {
            movieTitle += nodeArgs[i];
        }

    };

    movieQueryURL = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

    if (movieTitle === "") {

        axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy")

            .then(function (response) {

                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Cast: " + response.data.Actors);
                console.log("It's on Netflix!");

            }).catch(function (error) {

                console.log(error);

            });
    } else {

        axios.get(movieQueryURL)

            .then(function (response) {

                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Cast: " + response.data.Actors);

            }).catch(function (error) {

                console.log(error);

            });
    };

};

var doThis = function () {

    fs.readFile("random.txt", "utf8", function (err, data) {

        if (err) {
            return console.log(err);
        };

        var dataArr = data.split(",");

        if (dataArr[0] === "spotify-this-song") {
            spotify.search({ type: 'track', query: dataArr[1] })
                .then(function (response) {

                    console.log("Artist: " + response.tracks.items[0].artists[0].name);
                    console.log("Song Title: " + response.tracks.items[0].name);
                    console.log("Preview Link: " + response.tracks.items[0].preview_url);
                    console.log("From the Album: " + response.tracks.items[0].album.name);
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        if (dataArr[0] === "concert-this") {
            axios.get("https://rest.bandsintown.com/artists/" + dataArr[1] + "/events?app_id=codingbootcamp")
                .then(function (response) {
                    console.log("Venue: " + response.data[0].venue.name);
                    console.log("Location: " + response.data[0].venue.city);
                    console.log("Date: " + response.data[0].datetime);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        if (dataArr[0] === "movie-this") {
            axios.get("http://www.omdbapi.com/?t=" + dataArr[1] + "&y=&plot=short&apikey=trilogy")
                .then(function (response) {

                    console.log("Title: " + response.data.Title);
                    console.log("Year: " + response.data.Year);
                    console.log("IMDB Rating: " + response.data.imdbRating);
                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                    console.log("Country: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Cast: " + response.data.Actors);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };


    });


};


if (process.argv[2] === "concert-this") {
    concertThis();
};

if (process.argv[2] === "spotify-this-song") {
    spotifyThis();
};

if (process.argv[2] === "movie-this") {
    movieThis();
};

if (process.argv[2] === "do-what-it-says") {
    doThis();
};