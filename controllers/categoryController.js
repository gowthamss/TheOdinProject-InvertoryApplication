const Category = require('../models/category');
const Item = require('../models/item');
const Department = require('../models/department');

const async = require('async');
const { body, validationResult } = require('express-validator');

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
    Department.find().exec(function(err, departments) {
        if (err) { return next(err); }
        // Success, so pass departments to the form        
        res.render('category_form', { title: 'Create Category', departments: departments });
    })
}

// Display create post form of categorys
exports.category_create_post = [
    // Validate and Sanitize fields
    body('category_name', 'Category Name must not be empty').trim().isLength({ min: 1 }).escape(),
    body('category_description', 'Description must not be empty').trim().isLength({ min: 1 }).escape(),
    body('category_department', 'Department must not be empty').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
        // Process request after validation and sanitization
        const errors = validationResult(req);

        // Create a category object with trimmed and sanitized data
        var category = new Category({
            name: req.body.category_name,
            description: req.body.category_description,
            department: req.body.category_department
        });

        if (!errors.isEmpty()) {
            // There are errors. So render the form with selected data
            Department.find().exec(function(err, departments) {
                if (err) { return next(err); }
                // Success, so pass departments to the form        
                res.render('category_form', { title: 'Create Category', departments: departments, category: category });
            });
            return;
        } else {
            // Data from form is valid. Save category
            category.save(function(err) {
                if (err) { return next(err); }

                // Success, so redirect to all categories
                res.redirect('/inventory/categories')
            })
        }
    }
];

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