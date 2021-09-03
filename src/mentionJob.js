const functions = require('./functions');

class mentionJob {
    static async start(T) {
        var stream = T.stream('statuses/filter', { track: ['flippeningbot'] });

        stream.on('tweet', (mention) => {
            functions.tweet(T, mention.id_str, mention.user.screen_name);
        });
    }
}

module.exports = mentionJob;