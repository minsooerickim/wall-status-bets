const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors')
const app = express();

const stockModel = require('./models/Tickers');
const nasdaqModel = require('./models/nasdaq')
const { db } = require('./models/Tickers');

app.use(express.json()); //allows for receiving data from frontend in json
app.use(cors())

mongoose.connect(
    'mongodb+srv://minsookime:wall-street-bets-password@crud.xtajt.mongodb.net/stock?retryWrites=true&w=majority', 
    { useNewUrlParser: true, },
);

app.post('/insert', async (req, res) => {
    const tickerName = req.body.ticker
    const ticker = new stockModel({ticker: tickerName}); //ticker just represents an instance of the model

    try {
        await ticker.save(); //saved into the db collection
        res.send("inserted data");
    } catch(err) {
        console.log(err)
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