import mongoose from "mongoose";

const MappingSchema = new mongoose.Schema({
        staff_pass_id: { type: String, required: true },
        team_name: { type: String, required: true },   
        created_at: { type: Number, required: true },
});

// Compile the schema into a model
export const MappingModel = mongoose.model('mapping', MappingSchema, 'mapping');// first param is Name of the model ('mapping1' in your case): This is the name that Mongoose uses for the model. Mongoose creates a new instance of the model when you use this name in your code. It's also used for the name of the model in Mongoose's internal model tracking.

export const getMappings = () => MappingModel.find();
export const getTeamNameByStaffID = async (staffID: string): Promise<string | null> => {
    const staff = await MappingModel.findOne({ staff_pass_id: staffID });
    return staff ? staff.team_name : null;
};
export const createMapping = (staff_pass_id: string, team_name: string, created_at: Date) => {
    let EpochMilliseconds = created_at.getTime();
    new MappingModel({ staff_pass_id, team_name, EpochMilliseconds }).save().then((mapping) => mapping.toObject());
};
export const deleteMapping = (staff_pass_id: string) => MappingModel.findOneAndDelete({ staff_pass_id });