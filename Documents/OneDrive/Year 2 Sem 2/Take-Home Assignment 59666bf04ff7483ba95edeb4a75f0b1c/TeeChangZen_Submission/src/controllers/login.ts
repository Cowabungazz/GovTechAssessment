import express from 'express';

import { getAccessName, getPasswordbyAccessName } from '../db/users';

import crypto from 'crypto';
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { username, password } = req.body;
        const access = await getAccessName(username);
        const storedPassword = await getPasswordbyAccessName(username);
        if (access && storedPassword === password) {
            // Generate a new session token
            const sessionToken = crypto.randomBytes(64).toString('hex');

            // Store the session token in the database
            access.authentication.sessionToken = sessionToken;
            await access.save();
            
            res.cookie('AUTH', access.authentication.sessionToken, { domain: 'localhost', path: '/'}); // Set the session token as a cookie
            // Send the session token to the client
            res.status(200).json(access).end(); // sessionToken is a random string that is used to authenticate the user in future requests
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occurred' });
    }
}