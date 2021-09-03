# FlippeningBot

![](https://pbs.twimg.com/profile_images/1433782136503341062/A3RjmYs9_200x200.jpg)

Handles [@FlippeningBot](https://twitter.com/FlippeningBot) on Twitter, posting periodic updates on the Ethereum flippening status.

Ethereum Flippening is the event where the total market cap of Ethereum overtakes the same of Bitcoin.

### Local Setup

First, go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard) and create a new app. Generate its Access Keys and API Keys for future use.

```bash
$ git clone https://github.com/sggts04/FlippeningBot
$ cd FlippeningBot
$ npm install
$ touch .env
```

Inside `.env`, paste this and add the keys you generated for your bot before:
```
API_KEY=
API_KEY_SECRET=
ACCESS_TOKEN=
ACCESS_TOKEN_SECRET=
DELETE_JOB_SCHEDULE=0 */2 * * *
```

Then `npm start` should start the bot!


