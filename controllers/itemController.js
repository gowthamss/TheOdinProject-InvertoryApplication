const Item = require('../models/item');


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
    res.send('item list not implemented yet');
}

// Display create get form of items
exports.item_create_get = (req, res, next) => {
    res.send('item create get not implemented yet');
}

// Display create post form of items
exports.item_create_post = (req, res, next) => {
    res.send('item create post not implemented yet');
}

// Display delete get form of items
exports.item_delete_get = (req, res, next) => {
    res.send('item create get not implemented yet');
}

// Display delete post form of items
exports.item_delete_post = (req, res, next) => {
    res.send('item delete post not implemented yet');
}

// Display update get form of items
exports.item_update_get = (req, res, next) => {
    res.send('item create get not implemented yet');
}

// Display update post form of items
exports.item_update_post = (req, res, next) => {
    res.send('item update post not implemented yet');
}