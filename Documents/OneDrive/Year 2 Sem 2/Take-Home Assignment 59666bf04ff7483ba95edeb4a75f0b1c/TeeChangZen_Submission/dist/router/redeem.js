"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redeem_1 = require("../controllers/redeem");
var authenticate_1 = require("../controllers/authenticate");
exports.default = (function (router) {
    router.use(authenticate_1.authenticate); //no /protected route
    router.post('/redeem', redeem_1.redeem);
    return router;
});
//# sourceMappingURL=redeem.js.map