const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    number_in_stock: {
        type: Number,
        required: true,
        default: 0
    },
});

// Virtual for URL
itemSchema.virtual('url')
    .get(function() {
        return `/inventory/item/${this._id}`;
    })

module.exports = mongoose.model('Item', itemSchema);