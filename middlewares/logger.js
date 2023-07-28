const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('./asyncHandler');

exports.Logger = asyncHandler(async (req, res, next) => {
    const testToken = req.headers.authorization;
    let token;
    if (!testToken) {
        return res.status(400).json({
            success: false
        });
    }
    token = testToken.split(' ')[1];
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: verifiedToken.id });
    req.userId = user.id;
    req.userEmail = user.email;
    next();
});














// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const asyncHandler = require('./asyncHandler');

// exports.Logger = asyncHandler(async (req, res ,next)=>{
//     const testTokent = req.headers.authorization;
//     let token;
//     if(!testTokent){
//         return  res.status(400).json({
//             success: false
//         })
//     };
//     token = testTokent.split(' ')[1];
//     const verifeToken = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(verifeToken.id);
//         req.userId = user.id;
//         req.userEmail = user.email;
// });
