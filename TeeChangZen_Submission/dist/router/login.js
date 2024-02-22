"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_1 = require("../controllers/login");
exports.default = (function (router) {
    router.post('/login', login_1.login); //router is used to handle the request and response
    return router;
});
//# sourceMappingURL=login.js.map