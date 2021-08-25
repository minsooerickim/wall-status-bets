const mongoose = require('mongoose');

const nasdaqSchema = new mongoose.Schema({
    Symbol: String,
    Name: String,
}, {collection: 'nasdaq'});

const nasdaq = mongoose.model("nasdaq", nasdaqSchema)
module.exports = nasdaq