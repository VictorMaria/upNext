import { check } from 'express-validator';

const itemValidator = {
    add: [
        check('email')
            .not()
            .isEmpty({ ignore_whitespace: true })
            .withMessage('Email is required')
            .isEmail()
            .trim()
            .withMessage('Please use a valid email address'),
        check('content')
            .not()
            .isEmpty({ ignore_whitespace: true })
            .withMessage('Content is required')
            .isLength({ min: 3, max: 550 })
            .withMessage('Content characters should be at least 3 and at most 550'),
        check('from')
            .not()
            .isEmpty({ ignore_whitespace: true })
            .withMessage('start date (from) is required')
            .trim()
            .custom((from) => {
                const validDate = Date.parse(from);
                if (!validDate) {
                    throw new Error('Please enter a valid date');
                }
                if (new Date(from) < new Date()) {
                    throw new Error('Please enter a valid start date (from)');
                }
                
                return true;
            }),
        check('to')
            .optional()
            .trim()
            .custom((from) => {
                const validDate = Date.parse(from);
                if (!validDate) {
                    throw new Error('Please enter a valid date');
                }

                return true;
            }), 
    ],
};

export default itemValidator;