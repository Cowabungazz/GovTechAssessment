import express from 'express';

import { login } from '../controllers/login';


export default (router: express.Router) => {
    router.post('/login', login); //router is used to handle the request and response
    return router;
}