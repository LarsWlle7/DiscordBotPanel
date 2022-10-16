"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ws_1 = __importDefault(require("ws"));
var config_json_1 = __importDefault(require("./config.json"));
var http_1 = __importDefault(require("http"));
var console_1 = require("./ws/console");
var routers_1 = require("./routers");
var logger_1 = require("./managers/logger");
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var wss = new ws_1.default.Server({ port: config_json_1.default.port + 1 });
wss.on("connection", function (socket) {
    socket.send(JSON.stringify({ required_resource: "path" }));
    var connected = false;
    socket.on("message", function (msg) {
        var message = JSON.parse(msg.toString());
        if (message.password === config_json_1.default.socketPassword && message.route === "console") {
            logger_1.logger.info("new connection with console socket.");
            (0, console_1.WSConsoleListener)(socket);
            connected = true;
        }
        else {
            if (!connected) {
                socket.send(JSON.stringify({ msg: "Failed. No password and route found." }));
                logger_1.logger.warn("New connection, didn't receive a password nor route.");
                socket.close(3000);
            }
        }
    });
});
app.use(express_1.default.static(__dirname.replace("src", "").replace("dist", "") + "views/global/public"));
app.set("view engine", "ejs");
app.use("/", routers_1.MainRouter);
server.listen(config_json_1.default.port, function () {
    console.log("online.");
});
