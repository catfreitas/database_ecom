const { Product } = require('../../models/product');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {
    try {
        let filter = {};
        let page = req.query.page;
        let limit = req.query.limit;
        let isFeatured = req.query.isFeatured;
    
        if(!page && !limit){
            page = 1;
            limit = 100;
    
            filter = {page: page, limit: limit}
        }else{
            filter = {page: parseInt(page), limit: parseInt(limit)}
        }
        
        if(!isFeatured){
            isFeatured = true;
            filter = {isFeatured: isFeatured}
        }else{
            filter = {isFeatured: isFeatured}
        }

        if(req.query.categories){
            filter = {category: req.query.categories.toString().split(',')}
        }
    
        if(req.query.name){
            filter.name ={$regex:req.query.name, $options:"i"};
        }


        const productList = await Product.find(filter).populate('category'); //*

        /* if(!productList){
            return res.status(400).json({
                success: false,
                message: 'Can not receive the products filtered'
            });
        } */

        const result = productList.slice(((page-1)*limit),(page*limit))

        return res.status(200).send(result);
        
    } catch (err) {
        errorHandler(err, req, res);
    }
}




