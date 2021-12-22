const Department = require('../models/department');
const Category = require('../models/category');

const async = require('async');

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
    res.send('Department create get not implemented yet');
}

// Display create post form of departments
exports.department_create_post = (req, res, next) => {
    res.send('Department create post not implemented yet');
}

// Display delete get form of departments
exports.department_delete_get = (req, res, next) => {
    res.send('Department create get not implemented yet');
}

// Display delete post form of departments
exports.department_delete_post = (req, res, next) => {
    res.send('Department delete post not implemented yet');
}

// Display update get form of departments
exports.department_update_get = (req, res, next) => {
    res.send('Department create get not implemented yet');
}

// Display update post form of departments
exports.department_update_post = (req, res, next) => {
    res.send('Department update post not implemented yet');
}