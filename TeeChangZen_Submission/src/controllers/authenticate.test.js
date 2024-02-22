import * as users from '../db/users';
import { authenticate } from './authenticate';

//test for /redeem endpoint for no matching sessionToken
describe('authenticate', () => {
  it('responds with 401 Unauthorized if access is null', async () => {
    // Mock the request and response objects
    const mockReq = {
      cookies: { 'AUTH': 'fakeToken' },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();

    // Call the function with the mocked request and response
    // Mock getAccessBySessionToken to return null
    jest.spyOn(users, 'getAccessBySessionToken').mockResolvedValue(null);
    await authenticate(mockReq, mockRes, mockNext);

    // Check that the response status was set to 401
    expect(mockRes.status).toHaveBeenCalledWith(401);
    // Check that the response body was set to { message: 'Unauthorized' }
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });
});


//test for /redeem endpoint for matching sessionToken

describe('authenticate', () => {
  it('next is called if access is granted', async () => {
    // Mock the request and response objects
    const mockReq = {
      cookies: { 'AUTH': 'fakeToken' },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();
    // Mock getAccessBySessionToken to return true
    jest.spyOn(users, 'getAccessBySessionToken').mockResolvedValue(true);
    // Call the function with the mocked request and response
    await authenticate(mockReq, mockRes, mockNext);

    // Check that the response status was not called
    expect(mockRes.status).not.toHaveBeenCalledWith(401);
    // Check that the response body was not called
    expect(mockRes.json).not.toHaveBeenCalledWith({ message: 'Unauthorized' });
    // Check that the next function was called
    expect(mockNext).toHaveBeenCalled();
  });
});
