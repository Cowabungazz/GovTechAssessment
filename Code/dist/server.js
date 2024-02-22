"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var compression_1 = __importDefault(require("compression"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var mongoose_1 = __importDefault(require("mongoose"));
var server_1 = __importDefault(require("./router/server"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
var server = http_1.default.createServer(app);
server.listen(8080, function () {
    console.log('Server is running on http://localhost:8080/');
});
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect('mongodb://localhost:27017/Govtech');
mongoose_1.default.connection.on('error', function (error) {
    console.log(error);
});
app.use('/', (0, server_1.default)());
//# sourceMappingURL=server.js.map