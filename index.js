require('dotenv').config();
const tweetJob = require('./tweetJob');
const mentionJob = require('./mentionJob');

/*
T.post('statuses/update', { status: 'Hello Twitter!' }, function(err, data, response) {
    console.log(data)
})
*/

tweetJob.start();
mentionJob.start();
