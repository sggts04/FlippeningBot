const Twit = require('twit');
const axios = require('axios');
const schedule = require('node-schedule');
const progressbar = require('string-progressbar');

class tweetJob {
    static jobSchedule = process.env.DELETE_JOB_SCHEDULE || "0 */2 * * *";
    
    static async getData() {
        const promiseETH = axios.get("https://api.coingecko.com/api/v3/coins/ethereum");
        const promiseBTC = axios.get("https://api.coingecko.com/api/v3/coins/bitcoin");

        const res = await Promise.all([promiseETH, promiseBTC]).then((values) => { return values; });

        const data = {
            ratio: res[0].data.market_data.current_price.btc,
            eth_price: res[0].data.market_data.current_price.usd,
            eth_mktcap: res[0].data.market_data.market_cap.usd,
            btc_mktcap: res[1].data.market_data.market_cap.usd,
        }
        return data;
    }

    static async tweet(T) {
        const data = await this.getData();
        const [progressBar, percentage] = progressbar.filledBar(data.btc_mktcap, data.eth_mktcap, 20, '░', '▓');
        const tweetText = `Flippening Status: ${parseFloat(percentage).toFixed(2)}%\n${progressBar}\n\nETH Price: $${data.eth_price.toLocaleString('en-US')}\nETH Market Cap: $${data.eth_mktcap.toLocaleString('en-US')}`;
        T.post('statuses/update', { status: tweetText }, function(err, data, response) {
            console.log(`Tweeted:\n${tweetText}\n`)
        })
    }

    static async start() {
        schedule.scheduleJob(this.jobSchedule, () => {
            const T = new Twit({
                consumer_key: process.env.API_KEY,
                consumer_secret: process.env.API_KEY_SECRET,
                access_token: process.env.ACCESS_TOKEN,
                access_token_secret: process.env.ACCESS_TOKEN_SECRET
            });

            console.log('Tweeting flippening status...');
            this.tweet(T);
        });
    }
}

module.exports = tweetJob;