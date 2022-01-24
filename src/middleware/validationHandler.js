
import { validationResult } from 'express-validator';
import responseHandler from '../helpers/responderHandler';

const { errorResponse } = responseHandler;

const validationHandler = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorInfo = errors.array({ onlyFirstError: true });
            const errorMessage = errorInfo[0].msg;

            return errorResponse(res, 400, errorMessage);
        }

        next();
    } catch (error) {
        return errorResponse(res, 500, 'Something went wrong');
    }
};

export default validationHandler;
