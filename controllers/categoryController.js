const asyncHandler = require('../middlewares/asyncHandler');
const Category = require('../models/categoryModel');

exports.createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const filename = req.file.filename;
    const users = req.body.users;
    const newCategory = await Category.create({
        name: name,
        image: filename,
        users: users
    });
    res.status(200).json({
        success:true,
        newCategory
    })
});

exports.getOneCategory = asyncHandler(async (req,res)=>{
    const productId = req.params.id;
    const oneCategory = await Category.findById(productId)
        .populate('users')
        .populate('productName');
    res.status(200).json({ 
        success:true,
        oneCategory 
    });
});

exports.getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find()
        .populate('users')
        .populate('productName');
    res.status(200).json({
        success: true,
        categories: categories
    });
});


exports.editCategory = asyncHandler(async(req, res)=>{
    let id = req.params.id;
    const filter = { _id: id };
    let duc = await Category.findOneAndUpdate(filter, req.body, {new: true});
    res.status(200).send({ 
        success:true,
        duc
    })
});

exports.deleteCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (deletedCategory) {
        res.status(200).send({
        success: true,
        message: 'Category deleted successfully',
    })} 
    else {
        res.status(404).send({
        success: false,
        message: 'Category not found',
    })}
});
