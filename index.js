require('dotenv').config();
const tweetJob = require('./tweetJob');
const mentionJob = require('./mentionJob');

tweetJob.start();
mentionJob.start();
