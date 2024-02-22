import * as redemption from '../db/redemption';
import { redeem } from './redeem';

jest.spyOn(redemption, 'getRedemptionByTeamName').mockImplementation((teamName) => {
    if (teamName === 'testname') {
        return Promise.resolve({
            staff_pass_id: 'testid',
            team_name: 'testname',
            redeem_at: 1,
        });
    }
    else return null;
});


jest.spyOn(redemption, 'createRedemption').mockResolvedValue(null);

describe('redeem', () => {
    it('responds with 200 if staffID is valid', async () => {
        const mockReq = {
            body: { teamName: 'testname2' },
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await redeem(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith({ message: "Execute Redemption, Database Updated" });
    });
});

jest.spyOn(redemption, 'getRedeemedAtByTeamName').mockResolvedValue(1);

describe('redeem', () => {
    it('responds with 404 if staffID is valid', async () => {
        const mockReq = {
            body: { teamName: 'testname' },
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await redeem(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.send).toHaveBeenCalledWith({ teamName: 'testname', redeemedAt: 1, message: ' already redeemed' });
    });
});

