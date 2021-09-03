const Twit = require('twit');
require('dotenv').config();

var T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_KEY_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

T.post('statuses/update', { status: 'Hello Twitter!' }, function(err, data, response) {
    console.log(data)
})