"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lookup_1 = require("../controllers/lookup");
var authenticate_1 = require("../controllers/authenticate");
exports.default = (function (router) {
    router.use(authenticate_1.authenticate); //no /protected route
    router.get('/lookup/:staffID', lookup_1.lookup);
    return router;
});
//# sourceMappingURL=lookup.js.map