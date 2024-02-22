import * as mapping from '../db/mapping';
import { lookup } from './lookup';



describe('lookup', () => {
    it('responds with 200 if staffID is valid', async () => {
        const mockReq = {
            params: { staffID: 'test' },
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        jest.spyOn(mapping, 'getTeamNameByStaffID').mockResolvedValue('test');
        await lookup(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith({ teamName: 'test' });
    });
});




describe('lookup', () => {
    it('responds with 404 if staffID is invalid', async () => {
        const mockReq = {
            params: { staffID: 'test' },
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        jest.spyOn(mapping, 'getTeamNameByStaffID').mockResolvedValue(null);
        await lookup(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.send).toHaveBeenCalledWith({ message: 'Staff ID not found' });
    });
});



