"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSConsoleListener = void 0;
var EventManager_1 = require("../managers/EventManager");
var logger_1 = require("../managers/logger");
var messages = [];
EventManager_1.Events.on("console_message", function (time, type, message) {
    messages.push({ time: time, type: type, message: message });
});
var WSConsoleListener = function (socket) {
    socket.send(JSON.stringify({ msg: "Done", action: "SOCKET_CONSOLE_CONNECTED" }));
    socket.send(JSON.stringify({ messages: messages, type: "INITIAL" }));
    socket.on("message", function (message) {
        logger_1.logger.warn("Unexpectedly got message: ".concat(message.toString()));
        logger_1.logger.warn("Closing socket: unexpectedly received message.");
        socket.close(1003);
    });
    EventManager_1.Events.on("console_message", function (time, type, message) {
        if (!socket)
            return;
        socket.send(JSON.stringify({ data: { time: time, type: type, message: message }, origin: "console", type: "NEW" }));
    });
};
exports.WSConsoleListener = WSConsoleListener;
