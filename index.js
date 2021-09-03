require('dotenv').config();
const tweetJob = require('./jobs/tweetJob');
const mentionJob = require('./jobs/mentionJob');

tweetJob.start();
mentionJob.start();
