const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    image: String,
    metersInStock: {
        type:Number,
        required: true
    }

})

exports.User = mongoose.model('User', userSchema);
