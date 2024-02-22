import mongoose from "mongoose";

const AccessSchema = new mongoose.Schema({
        accessName: { type: String, required: true }, //for users that can access the redemption data and mapping data eg. admin1, admin2, admin3 ..
        authentication: {
            password: { type: String, required: true },
            sessionToken: { type: String, required: false },
        },
});

export const AccessModel = mongoose.model('users', AccessSchema, 'users');

export const getAccessName = (accessName: string) => AccessModel.findOne({ accessName });
//export const createAccess = (values: Record<string, any>) => new AccessModel(values).save().then((user) => user.toObject());
//Access to database are manually inputed into the database and the password is handed manually to people who have access to the database

export const getPasswordbyAccessName = (accessName: string) => 
    AccessModel.findOne({ accessName }).then((access) => access?.authentication.password);

export const getAccessBySessionToken = (sessionToken: string) => 
    AccessModel.findOne({ 'authentication.sessionToken': sessionToken });
