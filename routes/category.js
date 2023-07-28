const express = require('express');
const router  = express.Router();
const {createCategory, getOneCategory, getAllCategories, editCategory, deleteCategory} = require('../controllers/categoryController');
const{ Logger } = require('../middlewares/logger');
const { Upload } = require("../middlewares/Upload");

router.route('/').post(Logger, Upload.single("image"), createCategory).get(getAllCategories);
router.route('/:id').get(getOneCategory).put(editCategory).delete(deleteCategory);

module.exports = router;
