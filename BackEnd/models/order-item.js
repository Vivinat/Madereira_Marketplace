const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({   //OrderItem representa quanto do produto o usuario inseriu na conta
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }

})

exports.OrderItem = mongoose.model('OrderItem', orderItemSchema);