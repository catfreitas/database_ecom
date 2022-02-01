const { Product } = require('../../models/product');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {
    try{
        const productCount =  await Product.countDocuments({});

        if(!productCount){
            return res.status(400).send({success: false, message: "Cannot count the products!"});
        }

        return res.status(200).send({productCount: productCount});
    }catch(err){
        errorHandler(err, req ,res);
    }
}