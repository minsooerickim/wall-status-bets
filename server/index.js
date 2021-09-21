const axios = require('axios');

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const cors = require('cors')
const app = express();

const stockModel = require('./models/Tickers');
const nasdaqModel = require('./models/nasdaq');
const redditCountModel = require('./models/redditCount');

app.use(express.json()); //allows for receiving data from frontend in json
app.use(cors());

dotenv.config();

mongoose.connect(
    'mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@crud.xtajt.mongodb.net/stock?retryWrites=true&w=majority', 
    { useNewUrlParser: true, },
);

//inserting userinput ticker into db
app.post('/insert', async (req, res) => {
    //first find if alr exists; if exists => ++count; else => insert with 1 count

    if (await stockModel.countDocuments({ ticker: req.body.ticker }) != 0) {
        res.send('update');
    }
    else {
        const tickerName = req.body.ticker;
        const ticker = new stockModel({ ticker: tickerName, count: 1}); //ticker just represents an instance of the model

        try {
            await ticker.save(); //saved into the db collection
            res.send("inserted ticker");
        } catch(err) {
            console.log(err)
        }
    }
})

//updating count (# of user searches on wallstatusbets.io)
app.put('/updateCount', async (req, res) => {
    try {
        stockModel.findOne({ ticker: req.body.ticker }, (err, tick) => {
            tick.count += 1;
            tick.save();
        })
    } catch(err) {
        functionToHandleError(e);
    }
})

//ticker collection (userinput) in sorted order (highest to lowest searches)
app.get('/read', async (req, res) => {
    var sortedResult = await stockModel.find({}).sort({count: -1});
    res.send(sortedResult);
})

//retrieve all the nasdaq tickers from db
app.get('/nasdaq', async (req, res) => {
    nasdaqModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    })
})

//number of mentions of the stock in the past day, week, month, year
app.post('/search', async (req, res) => {
    //snoowrap
    'use strict';

    const snoowrapp = require('snoowrap');
    
    const r = new snoowrapp({
        userAgent: process.env.SNOO_USER_AGENT,
        clientId: process.env.SNOO_CLIENT_ID,
        clientSecret: process.env.SNOO_CLIENT_SECRET,
        refreshToken: process.env.SNOO_REFRESH_TOKEN,
    });
    // arry = [] arry[0] = length of 'hour' result; arry[1] = length of 'week' result etc.
    var arr = [];
    var result = r.getSubreddit('wallstreetbets').search({ query: req.body.ticker, time: "hour", limit: 1000 }); //hour, day, week, month, year
    var test = await result.length;
    test = test + "";
    arr.push(test);

    result = r.getSubreddit('wallstreetbets').search({ query: req.body.ticker, time: "day", limit: 1000 });
    test = await result.length;
    test = test + "";
    arr.push(test);

    result = r.getSubreddit('wallstreetbets').search({ query: req.body.ticker, time: "week", limit: 1000 });
    test = await result.length;
    test = test + "";
    arr.push(test);

    result = r.getSubreddit('wallstreetbets').search({ query: req.body.ticker, time: "month", limit: 1000 });
    test = await result.length;
    test = test + "";
    arr.push(test);

    result = r.getSubreddit('wallstreetbets').search({ query: req.body.ticker, time: "year", limit: 1000});
    test = await result.length;
    test = test + "";
    arr.push(test);

    res.send(arr);
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
                // userAgent: process.env.SNOO_USER_AGENT,
                // clientId: process.env.SNOO_CLIENT_ID,
                // clientSecret: process.env.SNOO_CLIENT_SECRET,
                // refreshToken: process.env.SNOO_REFRESH_TOKEN,
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

//trending posts on reddit r/wallstreetbets
app.post('/trending', async (req, res) => {
    //snoowrap
    'use strict';

    const snoowrapp = require('snoowrap');
    
    const r = new snoowrapp({
        userAgent: process.env.SNOO_USER_AGENT,
        clientId: process.env.SNOO_CLIENT_ID,
        clientSecret: process.env.SNOO_CLIENT_SECRET,
        refreshToken: process.env.SNOO_REFRESH_TOKEN,
    });
    //make the limit dynamic from req (selectors from frontend (top 5, 10, 15, 20, etc.))
    r.getHot('wallstreetbets', {limit: 100}).then(result => {
        if (JSON.stringify(result) === "") { res.send("empty string"); }
        else { res.send(JSON.stringify(result));}
    })
})

const port = process.env.PORT || 3001;
app.listen(port || 3001, () => {
    console.log('Server running on port 3001');
});

module.exports = app;


