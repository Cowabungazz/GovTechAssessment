import express from 'express';

import { getAccessBySessionToken } from '../db/users';

export const authenticate = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // Get the session token from the request headers
        const sessionToken = req.cookies['AUTH'];

        // Find the user with the given session token
        const access = await getAccessBySessionToken(sessionToken);

        if (!access) {
            // If no user was found, send a 401 Unauthorized response
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // If a user was found call next()
        next();
    } catch (err) {
        // If an error occurred, send a 500 Internal Server Error response
        res.status(500).json({ message: 'An error occurred' });
    }
}