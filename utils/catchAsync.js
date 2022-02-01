const catchAsync = (controller) => 
    (req, res, next) =>
    Promise.resolve(controller(req, res, next)).catch(next);

module.exports = catchAsync;