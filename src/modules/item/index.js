import express from 'express';
import * as itemController from './itemController';
import itemValidator from '../../validation/itemValidator';
import validationHandler from '../../middleware/validationHandler';

const Router = express.Router();

Router.post(
    '/items',
    itemValidator.add,
    validationHandler,
    itemController.add,
);

export default Router;
