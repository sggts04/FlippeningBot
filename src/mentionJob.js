const functions = require('./functions');

class mentionJob {
    static async start(T) {
        var stream = T.stream('statuses/filter', { track: ['@FlippeningBot', '@Flippeningbot', '@flippeningbot'] });
        
        stream.on('tweet', (mention) => {
            if(mention.text.toLowerCase().includes('update') || mention.text.toLowerCase().includes('status'))
                functions.tweet(T, mention.id_str, mention.user.screen_name);
        });
    }
}

module.exports = mentionJob;