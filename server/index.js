const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors')
const app = express();

const stockModel = require('./models/Tickers');
const nasdaqModel = require('./models/nasdaq');
const redditCountModel = require('./models/redditCount');
const { db } = require('./models/Tickers');

app.use(express.json()); //allows for receiving data from frontend in json
app.use(cors());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
  
app.use((req, res, next) => {
    const corsWhitelist = [
        'https://api.pushshift.io/',
        'localhost:3000',
        'localhost:3001',
        'localhost',
        'https://localhost:3000',
        'https://localhost:3001',
        'https://api.pushshift.io/reddit/search/submission/',
        'https://api.pushshift.io/reddit/search/submission/?q=ABNB&subreddit=wallstreetbets&size=100&after=1y'

    ];
    if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }

    next();
});
mongoose.connect(
    'mongodb+srv://minsookime:wall-street-bets-password@crud.xtajt.mongodb.net/stock?retryWrites=true&w=majority', 
    { useNewUrlParser: true, },
);

app.post('/insert', async (req, res) => {
    const tickerName = req.body.ticker;
    const ticker = new stockModel({ticker: tickerName}); //ticker just represents an instance of the model

    try {
        await ticker.save(); //saved into the db collection
        res.send("inserted ticker");
    } catch(err) {
        console.log(err)
    }
})

app.post('/redditCount', async (req, res) => {
    var url = req.body.config.url;
    const tickerName = url.substring(
        url.lastIndexOf("q") + 2,
        url.lastIndexOf("&subreddit")
    )
    const count = req.body.data.data.length;
    console.log(tickerName);
    console.log(count);
    const redditCount = new redditCountModel({ticker: tickerName, count: count});

    try {
        await redditCount.save();
        res.send("inserted redditCount");
    } catch(err) {
        functionToHandleError(e);
    }
})

app.get('/read', async (req, res) => {
    stockModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    })
})
app.get('/nasdaq', async (req, res) => {
    nasdaqModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    })
})
app.listen(3001, () => {
    console.log('Server running on port 3001');
});

module.exports = app;