#! /usr/bin/env node

console.log(
    "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);
// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Category = require("./models/category");
var Department = require("./models/department");
var Item = require("./models/item");
var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
var categories = [];
var items = [];
var departments = [];

function departmentCreate(name, cb) {
    departmentdetail = {
        name: name,
    };
    var department = new Department(departmentdetail);
    department.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log("New department: " + department);
        departments.push(department);
        cb(null, department);
    });
}

function categoryCreate(name, description, department, cb) {
    categorydetail = {
        name: name,
        description: description,
        department: department,
    };
    var category = new Category(categorydetail);
    category.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log("New Category: " + category);
        categories.push(category);
        cb(null, category);
    });
}

function itemCreate(name, description, category, price, number_in_stock, cb) {
    var itemdetail = new Item({
        name: name,
        description: description,
        category: category,
        price: price,
        number_in_stock: number_in_stock,
    });
    var item = new Item(itemdetail);
    item.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log("New Item: " + item);
        items.push(item);
        cb(null, item);
    });
}

function createDepartments(cb) {
    async.series(
        [
            function(callback) {
                departmentCreate(`Men's Fashion`, callback);
            },
            function(callback) {
                departmentCreate(`Women's Fashion`, callback);
            },
            function(callback) {
                departmentCreate(`Books`, callback);
            },
        ],
        // optional callback
        cb
    );
}

function createCategories(cb) {
    async.series(
        [
            function(callback) {
                categoryCreate(
                    `Men's Clothing`,
                    `Explore latest men's apparel`,
                    departments[0],
                    callback
                );
            },
            function(callback) {
                categoryCreate(
                    `Accessories`,
                    "Explore cool accessories",
                    departments[0],
                    callback
                );
            },
            function(callback) {
                categoryCreate(
                    `Men's shoes`,
                    "Find a right match for your foot",
                    departments[0],
                    callback
                );
            },
            function(callback) {
                categoryCreate(
                    `Women's Clothing`,
                    `Explore latest women's apparel`,
                    departments[1],
                    callback
                );
            },
            function(callback) {
                categoryCreate(
                    `Accessories`,
                    "Explore cool accessories",
                    departments[1],
                    callback
                );
            },
            function(callback) {
                categoryCreate(
                    `Women's shoes`,
                    "Find a right match for your foot",
                    departments[1],
                    callback
                );
            },
            function(callback) {
                categoryCreate(
                    `Fiction books`,
                    `Find super interesting fiction`,
                    departments[2],
                    callback
                );
            },
            function(callback) {
                categoryCreate(
                    `Children's books`,
                    `Find books that increases you child's creativity`,
                    departments[2],
                    callback
                );
            },
            function(callback) {
                categoryCreate(
                    `Text books`,
                    "Find all kind of text books",
                    departments[2],
                    callback
                );
            },
        ],
        // optional callback
        cb
    );
}

function createItems(cb) {
    async.parallel(
        [
            function(callback) {
                itemCreate(
                    `Nobody's Magic`,
                    `"With Nobody's Magic, Destiny Birdsong has given us a devastatingly beautiful, sexy, searing gift. These are stunning, irresistible stories of Southern Black womanhood that I will return to again and again."—Deesha Philyaw, National Book Award finalist for The Secret Lives of Church Ladies`,
                    categories[2],
                    28,
                    11,
                    callback
                );
            },
            function(callback) {
                itemCreate(
                    `Leather Jacket`,
                    `A brown leather jacket suits for all occassions.`,
                    categories[0],
                    99,
                    4,
                    callback
                );
            },
            function(callback) {
                itemCreate(
                    `Angel Frock`,
                    `A beautifully designed wedding frock for the bride.`,
                    categories[1],
                    295,
                    1,
                    callback
                );
            },
        ],
        // optional callback
        cb
    );
}

async.series(
    [createDepartments, createCategories, createItems],
    // Optional callback
    function(err, results) {
        if (err) {
            console.log("FINAL ERR: " + err);
        } else {
            console.log("Items: " + items);
        }
        // All done, disconnect from database
        mongoose.connection.close();
    }
);