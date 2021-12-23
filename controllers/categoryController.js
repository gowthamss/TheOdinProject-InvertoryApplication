const Category = require('../models/category');
const Item = require('../models/item');

const async = require('async');

// Display list of categorys
exports.category_list = (req, res, next) => {
    Category.find().exec(function(err, categories) {
        if (err) { return next(err); }

        // Success, so render category list
        res.render('category_list', { title: 'All Categories', categories: categories });
    });
}

// Display list of categorys
exports.category_detail = (req, res, next) => {
    async.parallel({
            category: function(callback) {
                Category.findById(req.params.id).exec(callback);
            },
            category_items: function(callback) {
                Item.find({ category: req.params.id }).exec(callback);
            }
        },
        function(err, results) {
            if (err) { return next(err); }

            if (results.category === null) {
                var err = new Error('Category not found');
                err.status = 404;
                return next(err);
            }

            // Success, so render items
            res.render('category_detail', { title: 'Items', category: results.category, category_items: results.category_items });
        }
    );
}

// Display create get form of categorys
exports.category_create_get = (req, res, next) => {
    res.send('category create get not implemented yet');
}

// Display create post form of categorys
exports.category_create_post = (req, res, next) => {
    res.send('category create post not implemented yet');
}

// Display delete get form of categorys
exports.category_delete_get = (req, res, next) => {
    res.send('category create get not implemented yet');
}

// Display delete post form of categorys
exports.category_delete_post = (req, res, next) => {
    res.send('category delete post not implemented yet');
}

// Display update get form of categorys
exports.category_update_get = (req, res, next) => {
    res.send('category create get not implemented yet');
}

// Display update post form of categorys
exports.category_update_post = (req, res, next) => {
    res.send('category update post not implemented yet');
}