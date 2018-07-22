# liri-node-app

Week 10 (LIRI Bot) Assignment

Created during Week 10 of GW Coding Bootcamp. The challenge was to use Node JS to create a LIRI bot. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. It's a command line node app that takes in parameters and returns data based on one of four commands:

  * `my-tweets`

  * `spotify-this-song`

  * `movie-this`

  * `do-what-it-says`

## Getting Started

- Clone down repo.
- Run command 'npm install' in Terminal or GitBash
- Run command 'node liri.js' or one of the commands below.

## What Each Command Does

1. `node liri.js my-tweets`

  * Displays my last 20 tweets and when they were created in terminal/bash window.

2. `node liri.js spotify-this-song <song name>`

  * Shows the following information about the song in terminal/bash window.
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from

  * Or if no song is passed through, it will default to
    *"The Sign" by Ace of Base.

3. `node liri.js movie-this <movie name>`

  * Shows the following information in terminal/bash.

    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    * Rotten Tomatoes Rating.
    * Rotten Tomatoes URL.

  * Or if no movie is passed through, it will default to "Mr. Nobody"

4. `node liri.js do-what-it-says`

  * Takes the text from random.txt and runs the song through spotify-this-song command

## Tech used
- Node.js
- Twitter NPM Package - https://www.npmjs.com/package/twitter
- Spotify NPM Package - https://www.npmjs.com/package/node-spotify-api
- Request NPM Package - https://www.npmjs.com/package/request
- Dotenv NPM Package - https://www.npmjs.com/package/dotenv

## Prerequisites
```
- Node.js - Download the latest version of Node https://nodejs.org/en/
```

## Built With

* Visual Studio Code - Code Editor

## Authors

* **Monte Cansler** - *Node JS* - [Monte Cansler](https://github.com/mcansler)