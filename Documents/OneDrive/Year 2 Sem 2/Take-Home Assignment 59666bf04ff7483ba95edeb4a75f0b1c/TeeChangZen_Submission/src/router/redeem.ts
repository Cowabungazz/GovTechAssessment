import express from 'express';

import { redeem } from '../controllers/redeem';

import { authenticate } from '../controllers/authenticate';

export default (router: express.Router) => {
    router.use(authenticate); //no /protected route
    router.post('/redeem', redeem);
    return router;
}