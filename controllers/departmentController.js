const Department = require('../models/department');
const Category = require('../models/category');

const async = require('async');
const { body, validationResult } = require('express-validator');

exports.index = (req, res, next) => {
    // Department.find()
    //     .exec(function(err, departments) {
    //         if (err) { return next(err); }

    //         // Success, so render view
    //         res.render('index', { title: 'Departments', departments: departments });
    //     });
    res.redirect('/inventory/departments');
}

// Display list of departments
exports.department_list = (req, res, next) => {
    Department.find()
        .exec(function(err, departments) {
            if (err) { return next(err); }

            // Success, so render view
            res.render('department_list', { title: 'Departments', departments: departments });
        });
}

// Display list of departments
exports.department_detail = (req, res, next) => {
    async.parallel({
            department: function(callback) {
                Department.findById(req.params.id).exec(callback);
            },
            department_categories: function(callback) {
                Category.find({ department: req.params.id }).exec(callback);
            }
        },
        function(err, results) {
            if (err) { return next(err); }

            if (results.department === null) {
                var err = new Error('Department not found');
                err.status = 404;
                return next(err);
            }

            // Success, so render department detail with categories
            res.render('department_detail', { title: 'Department Categories', department: results.department, department_categories: results.department_categories });
        }
    );
}

// Display create get form of departments
exports.department_create_get = (req, res, next) => {
    res.render('department_form', { title: 'Create Department' });
}

// Display create post form of departments
exports.department_create_post = [
    // Validate and Sanitize fields
    body('department_name').trim().isLength({ min: 3 }).escape().withMessage('Department name must be specified'),
    (req, res, next) => {
        // Extract the validation errors from the request
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors, so render the form with validation errors
            res.render('department_form', { title: 'Create Department', department: req.body, errors: errors.array() });
        } else {
            // Data from form is valid
            // Create department object with sanitized and trimmed data
            var department = new Department({
                name: req.body.department_name
            });

            department.save(function(err) {
                if (err) { return next(err); }

                // Successful, so redirect to departments
                res.redirect('/inventory/departments');
            })
        }
    }
];

// Display delete get form of departments
exports.department_delete_get = (req, res, next) => {
    res.render('ddfdf')
}

// Display delete post form of departments
exports.department_delete_post = (req, res, next) => {
    res.send('Department delete post not implemented yet');
}

// Display update get form of departments
exports.department_update_get = (req, res, next) => {
    Department.findById(req.params.id).exec(function(err, department) {
        if (err) { return next(err); }

        // Success, so render the form as GET with department name
        res.render('department_form', { title: 'Update Department', department: department });
    })
}

// Display update post form of departments
exports.department_update_post = [
    // Validate and Sanitize fields
    body('department_name').trim().isLength({ min: 3 }).escape().withMessage('Department name must be specified'),
    (req, res, next) => {
        // Validate and sanitize input
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors, so render the form as GET
            res.render('department_form', { title: 'Update Department', department: req.body, errors: errors.array() });
        } else {
            // Data from form is valid
            var department = new Department({
                name: req.body.department_name,
                _id: req.params.id
            });

            Department.findByIdAndUpdate(req.params.id, department, {}, function(err, thedepartment) {
                if (err) { return next(err); }

                // Success, so redirect to all departments
                res.redirect('/inventory/departments');
            })
        }
    }
];