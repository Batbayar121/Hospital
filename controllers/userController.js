const User = require('../models/userModel');
const asyncHandler = require('../middlewares/asyncHandler');
const {generateToken} = require('../utis/tokenGenerate');
const userModel = require('../models/userModel');

exports.register = asyncHandler(async (req, res) =>{
    const createUser = await User.create(req.body);
    res.status(200).json({
        success: true,
        createUser
    })
});

exports.login = asyncHandler(async (req, res)=>{
    const {email, password } = req.body;
    const findUser = await User.findOne({email: email});
    if(!findUser){
        res.status(403).json({
            success: false,
            message: 'nuuts ug email-ee shalgana uu'
        });
    };
    const check = await findUser.CheckPassword(password);
    const token = generateToken(findUser._id);
    res.status(200).json({
        success: true,
        findUser,
        token
    });
    if(!check){
        res.status(403).json({
            success: false,
            message: 'nuuts ug email-ee shalgana uu'
        });
    };
});

exports.addWishlist = asyncHandler(async (req, res)=>{
    const {productId} = req.body;
    const email = req.userEmail;
    const addList = await userModel.findOneAndUpdate(
        {email: email}, 
        {$addToSet:{ wishlist:productId}}
    );
    res.status(200).json({
        success: true,
        addList
    });
});

exports.getWishList = asyncHandler(async (req, res)=>{
    const List = await userModel
    .findById(req.userId)
    .select("wishlist")
    .populate("wishlist")
    .exec();
    res.status(200).json({
        success: true,
        List
    });
})



