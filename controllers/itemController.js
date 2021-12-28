const Item = require('../models/item');
const Category = require('../models/category');

const async = require('async');
const { body, validationResult } = require('express-validator');

// Display list of items
exports.item_list = (req, res, next) => {
    Item.find().populate('category').exec(function(err, items) {
        if (err) { return next(err); }

        // Success, so render all items
        res.render('item_list', { title: 'All Items', items: items });
    })
}

// Display list of items
exports.item_detail = (req, res, next) => {
    Item.findById(req.params.id).exec(function(err, item) {
        if (err) { return next(err); }

        res.render('item_detail', { title: 'Details', item: item });
    })
}

// Display create get form of items
exports.item_create_get = (req, res, next) => {
    Category.find().exec(function(err, categories) {
        if (err) { return next(err); }

        // Success, so render the item create form
        res.render('item_form', { title: 'Create Item', categories: categories });
    });
}

// Display create post form of items
exports.item_create_post = [
    // Validate and Sanitize fields
    body('item_name', 'Item Name must not be empty').trim().isLength({ min: 1 }).escape(),
    body('item_description', 'Description must not be empty').trim().isLength({ min: 1 }).escape(),
    body('item_category', 'Department must not be empty').trim().isLength({ min: 1 }).escape(),
    body('item_price', 'Price must not be empty').trim().isLength({ min: 1 }).escape(),
    body('item_units_in_stock', 'Units in stock must not be empty').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
        console.log(req.file);
        // Process request after validation and sanitization
        const errors = validationResult(req);

        // Create an item object with trimmed and sanitized data
        var item = new Item({
            name: req.body.item_name,
            description: req.body.item_description,
            category: req.body.item_category,
            price: req.body.item_price,
            number_in_stock: req.body.number_in_stock
        });

        if (!errors.isEmpty()) {
            // There are errors, so render the form with selected data
            Category.find().exec(function(err, categories) {
                if (err) { return next(err); }

                // Success, so render the item create form
                res.render('item_form', { title: 'Create Item', categories: categories, item: item, errors: errors.array() });
            });
            return;
        } else {
            // Data from form is valid
            item.save(function(err) {
                if (err) { return next(err); }

                // Success, so redirect to all items page
                res.redirect('/inventory/items')
            })
        }
    }
];

// Display delete get form of items
exports.item_delete_get = (req, res, next) => {
    Item.findById(req.params.id).exec(function(err, item) {
        if (err) { return next(err); }

        res.render('item_delete', { title: 'Delete Item', item: item });
    })
}

// Display delete post form of items
exports.item_delete_post = (req, res, next) => {
    Item.findByIdAndRemove(req.body.itemid, function(err) {
        if (err) { next(err); }

        // Success, so redirect to all items
        res.redirect('/inventory/items');
    })
}

// Display update get form of items
exports.item_update_get = (req, res, next) => {
    async.parallel({
            categories: function(callback) {
                Category.find().exec(callback);
            },
            item: function(callback) {
                Item.findById(req.params.id).populate('category').exec(callback);
            }
        },
        function(err, results) {
            if (err) { return next(err); }

            // Success, so render the form with item data
            res.render('item_form', { title: 'Update Item', item: results.item, categories: results.categories });
        }
    );
}

// Display update post form of items
exports.item_update_post = [
    // Validate and Sanitize fields
    body('item_name', 'Item Name must not be empty').trim().isLength({ min: 1 }).escape(),
    body('item_description', 'Description must not be empty').trim().isLength({ min: 1 }).escape(),
    body('item_category', 'Department must not be empty').trim().isLength({ min: 1 }).escape(),
    body('item_price', 'Price must not be empty').trim().isLength({ min: 1 }).escape(),
    body('item_units_in_stock', 'Units in stock must not be empty').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
        // Process request after validation and sanitization
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors, so render the form with filled data
            async.parallel({
                    categories: function(callback) {
                        Category.find().exec(callback);
                    },
                    item: function(callback) {
                        Item.findById(req.params.id).populate('category').exec(callback);
                    }
                },
                function(err, results) {
                    if (err) { return next(err); }

                    // Success, so render the form with item data
                    res.render('item_form', { title: 'Update Item', item: results.item, categories: results.categories, errors: errors.array() });
                }
            );
            return;
        } else {
            // Data from form is valid
            // Create an item object with trimmed and sanitized data
            var item = new Item({
                _id: req.params.id,
                name: req.body.item_name,
                description: req.body.item_description,
                category: req.body.item_category,
                price: req.body.item_price,
                number_in_stock: req.body.number_in_stock
            });

            Item.findByIdAndUpdate(req.params.id, item, {}, function(err, theitem) {
                if (err) { return next(err); }

                // Success, so redirect to item detail page
                res.redirect('/inventory/item/' + item._id);
            })
        }
    }
];