const express = require('express');
const router  = express.Router();
const {login, register, addWishlist, getWishList} = require('../controllers/userController');
const {Logger} = require('../middlewares/logger')
router.route('/').post(register);
router.route('/login').post(login);
router.route('/wishlist').post(Logger, addWishlist).get(Logger, getWishList);
module.exports = router;