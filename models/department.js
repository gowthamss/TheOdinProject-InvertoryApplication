const mongoose = require('mongoose');

// Import schema from mongoose
const Schema = mongoose.Schema;

// Create schema
const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    }
});

// Virtual for URL
departmentSchema.virtual('url')
    .get(function() {
        return `/inventory/department/${this._id}`;
    })


// Export model
module.exports = mongoose.model('Department', departmentSchema);