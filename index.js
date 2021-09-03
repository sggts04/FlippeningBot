require('dotenv').config();
const Twit = require('twit');
const tweetJob = require('./src/tweetJob');
const mentionJob = require('./src/mentionJob');

const T = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_KEY_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

tweetJob.start(T);
mentionJob.start(T);
