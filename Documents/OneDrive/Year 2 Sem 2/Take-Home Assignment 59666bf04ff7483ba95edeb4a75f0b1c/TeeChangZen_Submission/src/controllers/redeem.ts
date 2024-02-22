import express from 'express';
import { createRedemption, getRedeemedAtByTeamName, getRedemptionByTeamName } from '../db/redemption';

export const redeem = async (req: express.Request, res: express.Response) => {
    const teamName = req.body.teamName;
    const redemption = await getRedemptionByTeamName(teamName);
    if (!redemption) {
        const date = new Date();
        createRedemption(req.body.staffPassId, teamName, date);
        res.status(200).send({ message: "Execute Redemption, Database Updated" });
    } else {
        const redeemedAt = await getRedeemedAtByTeamName(teamName);
        res.status(404).send({ teamName, redeemedAt, message: ' already redeemed' });
    }
}



