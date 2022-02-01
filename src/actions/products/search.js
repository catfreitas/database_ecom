const { Product } = require('../../models/product');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {
    const parameter = req.params.name;
    let regex = new RegExp(parameter, 'i');
    
    try {
        const products = await Product.find({name: regex});

        if(products.length == 0){
            return res.status(200).send(`No results for search: ${parameter}`);
        }

        return res.status(200).send(products);
        
    } catch (err) {
        errorHandler(err, req, res);
    }

}

