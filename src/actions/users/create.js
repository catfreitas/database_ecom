const {User} = require('../../models/user');
const bcrypt = require('bcryptjs');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {
    try{
        let user = new User({
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10, process.env.SECRET_KEY)
        });

        if(!user){
            return res.status(400).json({success: false, message: "The user cannot be created!"});
        }
    
        user = await user.save();

        res.status(201).send(user);
    }catch(err){
        errorHandler(err, req, res);
    }
}