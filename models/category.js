const mongoose = require('mongoose');

// Import schema from mongoose
const Schema = mongoose.Schema;

// Create schema
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    description: {
        type: String,
        required: true,
        maxlength: 256
    }
});

// Virtual for URL
categorySchema.virtual('url')
    .get(function() {
        return `/inventory/category/${this._id}`;
    })


// Export model
module.exports = mongoose.model('Category', categorySchema);