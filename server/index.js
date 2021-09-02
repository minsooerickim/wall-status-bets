const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors')
const app = express();

const stockModel = require('./models/Tickers');
const nasdaqModel = require('./models/nasdaq');
const redditCountModel = require('./models/redditCount');

app.use(express.json()); //allows for receiving data from frontend in json
app.use(cors());
  
// app.use((req, res, next) => {
//     const corsWhitelist = [
//         'https://api.pushshift.io/',
//         'localhost:3000',
//         'localhost:3001',
//         'localhost',
//         'https://localhost:3000',
//         'https://localhost:3001',
//         'https://api.pushshift.io/reddit/search/submission/',
//         'https://api.pushshift.io/reddit/search/submission/?q=ABNB&subreddit=wallstreetbets&size=100&after=1y'

//     ];
//     if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
//         res.header('Access-Control-Allow-Origin', req.headers.origin);
//         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     }

//     next();
// });
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
    //check if entry already exists in db
    // const entry = await redditCountModel.findOne({ticker: req.body.ticker});
    // if (!entry) { 
        console.log(req.body.ticker + ": " + req.body);
        const redditCount = new redditCountModel({ticker: req.body.ticker, count: req.body.count});
        try {
            await redditCount.save();
            res.send("inserted redditCount");
        } catch(err) {
            functionToHandleError(e);
        }
    // }
})

//ticker collection (userinput)
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
// app.post('/wsbCount', async (req, res) => {
//     var result = stockModel.count({ticker: req.body.ticker})
//     console.log(result);
//     res.send("boo")
// })

//data was too big for browser to handle
// app.post('/snoowrap', async (req, res) => {
//     var tick = req.body.Symbol + "";
//     const entry = await redditCountModel.findOne({ticker: tick});
//     if (!entry) { 

//         //snoowrap
//         'use strict';

//         const snoowrapp = require('snoowrap');
        
//         const r = new snoowrapp({
//             userAgent: 'script:test:v1.0.0 <developerminsoo>',
//             clientId: 'Ur9aW_N8R7ZBnkbCmHqA2g',
//             clientSecret: '7-olaVnHIokgpdR22zh3YhxpQoJmTA',
//             refreshToken: '726503909821-n6MN-jgHNbngOEnK_QTSSMnnFsxMUQ',
//         });
//         r.getSubreddit('wallstreetbets').search({query: req.body.Symbol, time:'day', limit:500}).then(result => {
//             var count = result.length;
//             count = count + "";
//             res.send(count);
//         })

//     }
//     else {
//         console.log(req.body.Symbol + " already exists");
//         res.send("exists");
//     }
    
//     //do all the api work here and just send over the number of mentions or sum
    
//     //loop through nasdaq list; keep count of number of queries; push into db; list top 5, 10, etc
//     // console.log(req);
// })

app.post('/trending', async (req, res) => {
    //snoowrap
    'use strict';

    const snoowrapp = require('snoowrap');
    
    const r = new snoowrapp({
        userAgent: 'script:test:v1.0.0 <developerminsoo>',
        clientId: 'Ur9aW_N8R7ZBnkbCmHqA2g',
        clientSecret: '7-olaVnHIokgpdR22zh3YhxpQoJmTA',
        refreshToken: '726503909821-n6MN-jgHNbngOEnK_QTSSMnnFsxMUQ',
    });
    //make the limit dynamic from req (selectors from frontend (top 5, 10, 15, 20, etc.))
    r.getHot('wallstreetbets', {limit: 10}).then(result => {
        if (JSON.stringify(result) === "") { res.send("empty string"); }
        else { res.send(JSON.stringify(result)); }
    })
})
app.listen(3001, () => {
    console.log('Server running on port 3001');
});

module.exports = app;


