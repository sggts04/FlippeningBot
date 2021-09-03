const axios = require('axios');
const progressbar = require('string-progressbar');

class functions {
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

    static async tweet(T, id, mention) {
        const data = await this.getData();
        const [progressBar, percentage] = progressbar.filledBar(data.btc_mktcap, data.eth_mktcap, 20, '░', '▓');
        const tweetText = `Flippening Status: ${parseFloat(percentage).toFixed(2)}%\n${progressBar}\n\nETH Price: $${data.eth_price.toLocaleString('en-US')}\nETH Market Cap: $${data.eth_mktcap.toLocaleString('en-US')}`;
        T.post('statuses/update', { status: tweetText, in_reply_to_status_id: id, auto_populate_reply_metadata: true }, function(err, data, response) {
            console.log(err);
            console.log(`Tweeted:\n${tweetText}\n`)
        });
    }
}

module.exports = functions;