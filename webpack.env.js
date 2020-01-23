var env = require('dotenv').config().parsed;
var argv = require('yargs').argv;

module.exports = {
  'PORT': JSON.stringify(env.PORT),
  'NODE_ENV': JSON.stringify(argv.env),
  'SPOTIFY_CLIENT_ID': JSON.stringify(env.SPOTIFY_CLIENT_ID),
  'SPOTIFY_REDIRECT_URI': JSON.stringify(env.SPOTIFY_REDIRECT_URI),
};