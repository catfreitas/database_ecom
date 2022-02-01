const {User} = require('../../models/user');
const mongoose = require('mongoose');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({
            success: false,
            message: 'Invalid User ID. ID is not a Mongoose ID'
        });
    }

    try {
        const user = await User.findById(req.params.id).select('-password');
    
        if(!user){
            return res.status(400).json({sucess: false, message: 'The user was not found. User Id Invalid'});
        }
    
        return res.status(200).send(user);
        
    } catch (err) {
        errorHandler(err, req, res);
    }
}