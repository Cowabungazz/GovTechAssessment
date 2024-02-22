import express from "express";

import lookup from "./lookup";

import redeem from "./redeem";

import login from "./login";

const router = express.Router();

export default (): express.Router => {
    login(router);
    lookup(router);
    redeem(router);
    return router;
};