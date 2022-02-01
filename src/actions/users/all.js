const {User} = require('../../models/user');
const mongoose = require('mongoose');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {
    try {
        const userList = await User.find().select('-password');
        res.status(200).send(userList);    
        
    } catch (err) {
        errorHandler(err, req, res);
    }
}