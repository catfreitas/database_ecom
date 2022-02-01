const {User} = require('../../models/user');
const mongoose = require('mongoose');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({
            success: false,
            message: 'Invalid User ID'
        });
    }

    await User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(user){
            return res.status(200).json({success: true, message: 'User deleted'});
        }else{
            return res.status(404).json({sucess: false, message: 'User not found. User Id Invalid'});
        }
    }).catch(err =>{
        errorHandler(err, req, res);
    })
}