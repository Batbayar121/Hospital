const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = Schema ({
    id:{
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type:String,
        required: true
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
    
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

categorySchema.virtual('productName', {
    ref: 'product',
    localField: '_id',
    foreignField: 'categoryName',
    justOne: true
});

module.exports = mongoose.model('category', categorySchema);
