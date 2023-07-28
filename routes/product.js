const express = require("express");
const router = express.Router();
const {createProduct, getOneProduct, getAllProduct, editProduct, deleteProduct} = require("../controllers/productController");

router.route('/').post(createProduct).get(getAllProduct);
router.route('/:id').get(getOneProduct).put(editProduct).delete(deleteProduct);

module.exports = router;