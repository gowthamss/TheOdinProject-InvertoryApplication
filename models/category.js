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
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    }
});

// Virtual for URL
categorySchema.virtual('url')
    .get(function() {
        return `/inventory/category/${this._id}`;
    })


// Export model
module.exports = mongoose.model('Category', categorySchema);