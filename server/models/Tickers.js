const mongoose = require('mongoose');

const tickersSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    }
});

const Ticker = mongoose.model("Ticker", tickersSchema)
module.exports = Ticker