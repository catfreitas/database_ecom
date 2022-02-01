const { Product } = require('../../models/product');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {

    try {
        const count = req.params.count ? req.params.count : 0
        const products =  await Product.find({isFeatured: true}).limit(+count);

        if(!products){
            return res.status(400).json({success: false, message: 'Cannot find the products'});
        }
        
        return res.status(200).send(products);

    } catch (err) {
        errorHandler(err, req, res)
    }

}