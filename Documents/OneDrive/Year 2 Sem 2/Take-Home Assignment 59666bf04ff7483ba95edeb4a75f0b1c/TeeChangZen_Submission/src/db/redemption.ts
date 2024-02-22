import mongoose from "mongoose";

const RedemptionSchema = new mongoose.Schema({
        staff_pass_id: { type: String, required: true },
        team_name: { type: String, required: true },   
        redeemed_at: { type: Number, required: true },
});

// Compile the schema into a model
export const RedemptionModel = mongoose.model('redemption', RedemptionSchema, 'redemption');

export const getRedemptions = () => RedemptionModel.find();
export const getRedemptionByTeamName = (team_name: string) => RedemptionModel.findOne({ team_name });
export const getStaffIDByTeamName = async (teamName: string): Promise<string | null> => {
    const redemption = await RedemptionModel.findOne({ team_name: teamName });
    return redemption ? redemption.staff_pass_id : null;
};
export const getRedeemedAtByTeamName = async (teamName: string): Promise<Date | null> => { 
    const redemption = await RedemptionModel.findOne({ team_name: teamName });
    return redemption ? new Date(redemption.redeemed_at) : null; //stored in epochmilliseconds but we want to return a date object
};
export const createRedemption = (staff_pass_id: string, team_name: string, redeemedat: Date) => {
    let redeemed_at = redeemedat.getTime(); //stored in epochmilliseconds
    new RedemptionModel({ staff_pass_id, team_name, redeemed_at }).save().then((redemption) => redemption.toObject());
};
export const deleteRedemption = (staff_pass_id: string) => RedemptionModel.findOneAndDelete({ staff_pass_id });