const mongoose = require('mongoose');

const redditCountSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true,
    },
    count: {
        type: String,
        required: true,
    }
});

const redditCount = mongoose.model("redditCount", redditCountSchema)
module.exports = redditCount