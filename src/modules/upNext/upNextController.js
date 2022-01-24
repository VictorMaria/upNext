import * as upNextService from './upNextService';
import responseHandler from '../../helpers/responderHandler';

const { successResponse, errorResponse } = responseHandler;

export const add = async(req, res) => {
    try {
        const tickingItem = await upNextService.add(req.body);
        return successResponse(res, 201,  { data: tickingItem },'Item added successfully, the ticking begins')
    } catch (error) {
        return errorResponse(res, 500, 'Up Next is experiencing a little shock');
    }
};
