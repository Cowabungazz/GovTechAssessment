import crypto from 'crypto';
import * as users from '../db/users';
import { login } from './login';


  // Reset all mocks after each test
afterEach(() => {
  jest.resetAllMocks();
});


describe('login', () => {
    it('responds with 401 Unauthorized if username and password is invalid', async () => {
        // Mock the request and response objects
        const mockReq = {
        body: { username: 'test', password: '' },
        };
        const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        // Mock getAccessName and getPasswordbyAccessName to return specific values
  jest.spyOn(users, 'getAccessName').mockResolvedValue({
    accessName: 'test',
    authentication: {
      sessionToken: null,
    },
    save: jest.fn(), // Add a mock save method
  });
  jest.spyOn(users, 'getPasswordbyAccessName').mockResolvedValue('password');

        // Call the function with the mocked request and response
        await login(mockReq, mockRes);

        // Check that the response status was set to 401
        expect(mockRes.status).toHaveBeenCalledWith(401);
        // Check that the response body was set to { message: 'Unauthorized' }
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });
});



//test for can login
describe('login', () => {
    it('responds with 200 if username and password valid', async () => {
        // Mock the request and response objects
        const mockReq = {
        body: { username: 'test', password: 'password' },
        };
        const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        cookie: jest.fn(),
        end: jest.fn(),
        };
        // Mock crypto.randomBytes to return a buffer that converts to 'testToken' when toString('hex') is called
jest.spyOn(crypto, 'randomBytes').mockReturnValue(Buffer.from('testToken', 'utf8'));
jest.spyOn(users, 'getPasswordbyAccessName').mockResolvedValue('password');
jest.spyOn(users, 'getAccessName').mockResolvedValue({
  accessName: 'test',
  authentication: {
    sessionToken: null,
  },
  save: jest.fn().mockResolvedValue(undefined), // Mock save to resolve successfully
});
        // Call the function with the mocked request and response
        await login(mockReq, mockRes);

        // Check that the cookie was set correctly
        //expect(mockRes.cookie).toHaveBeenCalledWith('AUTH', 'testToken', { domain: 'localhost', path: '/' });
        // Check that the response status was set to 200
        expect(mockRes.status).toHaveBeenCalledWith(200);
        // Check that the response body was set to the access object
        expect(mockRes.json).toHaveBeenCalled();
        // Check that end was called
        expect(mockRes.end).toHaveBeenCalled();
    });
});

