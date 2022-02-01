const {User} = require('../../models/user');
const errorHandler = require('../../../middlewares/error-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({success: false, message: "Email and Password is required"})
    }

    try {
        const user = await User.findOne({email: email});
        const secret = process.env.SECRET_KEY;

        if(!user){
            return res.status(400).json({success: false, message: "User not found, email invalid"});
        }

        if(user && bcrypt.compareSync(password, user.password)){
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                secret,
                {expiresIn: process.env.TOKEN_EXPIRES_IN}
            )
    
            return res.status(201).send({user: user.email, token: token});
        }else{
            return res.status(400).json({success: false, message: "Password is wrong"})
        }

    } catch (err) {
        errorHandler(err, req, res);
    }
}