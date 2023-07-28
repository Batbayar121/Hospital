const Product = require('../models/productModel');
const asyncHandler = require('../middlewares/asyncHandler');


exports.createProduct = asyncHandler(async(req, res)=>{
        const {name, description, price, quantity, categoryName } = req.body;
        const data = await Product.create({ name, description, price, quantity, categoryName });
        res.status(200).json({
            success:true,
            data
        });
});

exports.getOneProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id.trim();
    const pro = await Product.findById(productId);
    res.status(200).json({
        success: true,
        pro
    });
});


exports.getAllProduct = asyncHandler(async(req, res)=>{
    let products = await Product.find().populate('categoryName');
    res.status(200).send({
        products
    })
});

exports.editProduct = asyncHandler(async(req, res)=>{
    let id = req.params.id;
    const filter = { _id: id };
    let duc = await Product.findOneAndUpdate(filter, req.body, {new:true});
    res.status(200).send({ 
        success:true,
        duc
    })
});

exports.deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct) {
        res.status(200).send({
        success: true,
        message: 'Product deleted successfully',
    })} 
    else {
        res.status(404).send({
        success: false,
        message: 'Product not found',
    })}
});
