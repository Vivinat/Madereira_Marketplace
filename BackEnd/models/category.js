const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: String,
    image: String,
    metersInStock: {
        type:Number,
        required: true
    }

})

exports.Category = mongoose.model('Category', categorySchema);