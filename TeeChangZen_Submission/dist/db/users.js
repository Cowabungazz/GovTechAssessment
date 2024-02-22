"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessBySessionToken = exports.getPasswordbyAccessName = exports.getAccessName = exports.AccessModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var AccessSchema = new mongoose_1.default.Schema({
    accessName: { type: String, required: true }, //for users that can access the redemption data and mapping data eg. admin1, admin2, admin3 ..
    authentication: {
        password: { type: String, required: true },
        sessionToken: { type: String, required: false },
    },
});
exports.AccessModel = mongoose_1.default.model('users', AccessSchema, 'users');
var getAccessName = function (accessName) { return exports.AccessModel.findOne({ accessName: accessName }); };
exports.getAccessName = getAccessName;
//export const createAccess = (values: Record<string, any>) => new AccessModel(values).save().then((user) => user.toObject());
//Access to database are manually inputed into the database and the password is handed manually to people who have access to the database
var getPasswordbyAccessName = function (accessName) {
    return exports.AccessModel.findOne({ accessName: accessName }).then(function (access) { return access === null || access === void 0 ? void 0 : access.authentication.password; });
};
exports.getPasswordbyAccessName = getPasswordbyAccessName;
var getAccessBySessionToken = function (sessionToken) {
    return exports.AccessModel.findOne({ 'authentication.sessionToken': sessionToken });
};
exports.getAccessBySessionToken = getAccessBySessionToken;
//# sourceMappingURL=users.js.map