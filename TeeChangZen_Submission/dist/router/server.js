"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var lookup_1 = __importDefault(require("./lookup"));
var redeem_1 = __importDefault(require("./redeem"));
var login_1 = __importDefault(require("./login"));
var router = express_1.default.Router();
exports.default = (function () {
    (0, login_1.default)(router);
    (0, lookup_1.default)(router);
    (0, redeem_1.default)(router);
    return router;
});
//# sourceMappingURL=server.js.map