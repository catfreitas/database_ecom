const {User} = require('../../models/user');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({
            success: false,
            message: 'Invalid User ID. ID is not a Mongoose ID'
        });
    }

    const userId = await User.findById(req.params.id);
    
    try {
        let newPassword = '';
        if(req.body.password){
            newPassword = bcrypt.hashSync(req.body.password, 10, process.env.SECRET_KEY);
        } else{
            newPassword = userId.password;
        }
    
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {...req.body, password: newPassword},
            { runValidators: true, new : true }
        )
    
        if(!user){
            return res.status(500).json({success: false, message: "Invalid Id. The user cannot be updated!"})
        }
        
        res.status(201).send(user);
        
    } catch (error) {
        errorHandler(err, req, res);
    }
}