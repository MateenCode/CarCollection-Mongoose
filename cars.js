const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true},
    model: {type: String},
    year: {type: Number},
    doors: {type: Number},
    image: {type: String},
    features: {
        color: { type: String, },
        automatic: {type: String,}
    }
})

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
