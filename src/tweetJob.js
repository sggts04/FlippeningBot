const functions = require('./functions');
const schedule = require('node-schedule');

class tweetJob {
    static jobSchedule = process.env.DELETE_JOB_SCHEDULE || "0 */2 * * *";

    static async start(T) {
        schedule.scheduleJob(this.jobSchedule, () => {
            console.log('Tweeting flippening status...');
            functions.tweet(T);
        });
    }
}

module.exports = tweetJob;