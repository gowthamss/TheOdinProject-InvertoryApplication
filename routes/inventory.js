const express = require('express');
const router = express.Router();

// Require controller modules
const department_controller = require('../controllers/departmentController');
const category_controller = require('../controllers/categoryController');
const item_controller = require('../controllers/itemController');


// Department routes

// GET inventory home page
router.get('/', department_controller.index);

// GET request for creating a Department. NOTE This must come before routes that display Department (uses id).
router.get('/departments/create', department_controller.department_create_get);

// POST request for creating Department
router.post('/departments/create', department_controller.department_create_post);

// GET request for deleting Department
router.get('/department/:id/delete', department_controller.department_delete_get);

// POST request for deleting Department
router.post('/department/:id/delete', department_controller.department_delete_post);

// GET request for updating Department
router.get('/department/:id/update', department_controller.department_update_get);

// POST request for updating Department
router.post('/department/:id/update', department_controller.department_update_post);

// GET request for one Department.
router.get('/department/:id', department_controller.department_detail);

// GET request for list of all Departments.
router.get('/departments', department_controller.department_list);


// Category routes

// GET request for creating a Department. NOTE This must come before routes that display Department (uses id).
router.get('/category/create', category_controller.category_create_get);

// POST request for creating category
router.post('/category/create', category_controller.category_create_post);

// GET request for deleting category
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request for deleting category
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request for updating category
router.get('/category/:id/update', category_controller.category_update_get);

// POST request for updating category
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one category.
router.get('/category/:id', category_controller.category_detail);

// GET request for list of all categorys.
router.get('/categories', category_controller.category_list);

// Item routes

// GET request for creating a Department. NOTE This must come before routes that display Department (uses id).
router.get('/item/create', item_controller.item_create_get);

// POST request for creating item
router.post('/item/create', item_controller.item_create_post);

// GET request for deleting item
router.get('/item/:id/delete', item_controller.item_delete_get);

// POST request for deleting item
router.post('/item/:id/delete', item_controller.item_delete_post);

// GET request for updating item
router.get('/item/:id/update', item_controller.item_update_get);

// POST request for updating item
router.post('/item/:id/update', item_controller.item_update_post);

// GET request for one item.
router.get('/item/:id', item_controller.item_detail);

// GET request for list of all items.
router.get('/items', item_controller.item_list);


module.exports = router;