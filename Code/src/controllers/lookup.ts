import express from 'express';
import { getTeamNameByStaffID } from '../db/mapping';

export const lookup = async (req: express.Request, res: express.Response) => {
    const staffID = req.params.staffID;
    //console.log(staffID);
    const teamName = await getTeamNameByStaffID(staffID);
    //console.log(teamName);
    if (teamName) {
        res.status(200).send({ teamName });
    } else {
        res.status(404).send({ message: "Staff ID not found" });
    }
}