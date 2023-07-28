const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = Schema ({
    id: {
        type: Number,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    categoryName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }
});

module.exports = mongoose.model('product', productSchema);
