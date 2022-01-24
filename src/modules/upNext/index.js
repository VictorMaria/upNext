import express from 'express';
import * as upNextController from './upNextController';
import upNextValidator from '../../validation/upNextValidator';
import validationHandler from '../../middleware/validationHandler';

const Router = express.Router();

Router.post(
    '/upnexts',
    upNextValidator.add,
    validationHandler,
    upNextController.add,
);

export default Router;
