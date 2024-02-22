import express from 'express';

import { lookup } from '../controllers/lookup';

import { authenticate } from '../controllers/authenticate';

export default (router: express.Router) => {
    router.use(authenticate); //no /protected route
    router.get('/lookup/:staffID', lookup);
    return router;
}