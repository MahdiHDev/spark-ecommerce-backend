const { validationResult } = require('express-validator');
const { errorResponse } = require('../controllers/responseController');

const runValidation = (req, res, next) => {
    const errors = validationResult(req);
    console.log('errors');
    try {
        if (!errors.isEmpty()) {
            return errorResponse(res, {
                statusCode: 422,
                message: errors.array()[0].msg,
            });
        }
        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = runValidation;
