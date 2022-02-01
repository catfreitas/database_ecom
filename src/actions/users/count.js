const {User} = require('../../models/user');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (_, res) => {
    try{
        const userCount =  await User.countDocuments({});

        if(!userCount){
            return res.status(400).json({success: false, message: "Cannot count the users!"});
        }

        return res.status(200).send({userCount: userCount});
    } catch (err){
        errorHandler(err, req, res);
    }
}