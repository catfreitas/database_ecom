const {Category} = require('../../models/category');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.status(200).send(categoryList);   
    } catch (err) {
        errorHandler(err, req, res);
    }
}