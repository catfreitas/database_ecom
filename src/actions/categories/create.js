const {Category} = require('../../models/category');
const errorHandler = require('../../../middlewares/error-handler');

module.exports = async(req, res) => {  
    try {
        let category = new Category({...req.body});

        category = await category.save();
        res.status(201).send(category);

    } catch (err) {
        errorHandler(err, req, res);
    }
}