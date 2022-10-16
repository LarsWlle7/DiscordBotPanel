"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var chalk_1 = __importDefault(require("chalk"));
var process_1 = require("process");
var EventManager_1 = require("./EventManager");
exports.logger = {
    warn: function (message) {
        var Time = getTime();
        EventManager_1.Events.emit("console_message", getFormattedTime(), "[WARN]:", message);
        process_1.stdout.write("".concat(Time, " ").concat(chalk_1.default.yellow("[WARN]:"), " ").concat(message, "\n"));
    },
    info: function (message, init) {
        var Time = getTime();
        EventManager_1.Events.emit("console_message", getFormattedTime(), "[INFO]:", message);
        process_1.stdout.write("".concat(Time, " ").concat(chalk_1.default.cyan("[INFO]:"), " ").concat(message, "\n"));
    },
    error: function (message, stopOnError) {
        var Time = getTime();
        EventManager_1.Events.emit("console_message", getFormattedTime(), "[ERROR]:", message);
        process_1.stdout.write("".concat(Time, " ").concat(chalk_1.default.red("[ERROR]:"), " ").concat(message, "\n"));
        stopOnError ? process.exit(400) : null;
    },
    fatal: function (message, stopOnFatal) {
        var Time = getTime();
        process_1.stdout.write("".concat(Time, " ").concat(chalk_1.default.magenta("[FATAL]:"), " ").concat(message, "\n"));
        EventManager_1.Events.emit("console_message", getFormattedTime(), "[FATAL]:", message);
        stopOnFatal ? process.exit(400) : null;
    },
    debug: function (message, origin) {
        var Time = getTime();
        EventManager_1.Events.emit("console_message", getFormattedTime(), "[DEBUG]:", message);
        process_1.stdout.write("".concat(Time, " ").concat(chalk_1.default.bgMagentaBright("[DEBUG]:"), " ").concat(chalk_1.default.cyan("[".concat(origin, "]:")), " ").concat(message, "\n"));
    },
};
function getTime() {
    var time = new Date();
    var _Time = "".concat(time.getHours(), ":").concat(time.getMinutes() < 10 ? "0".concat(time.getMinutes()) : time.getMinutes(), ":").concat(time.getSeconds() < 10 ? "0".concat(time.getSeconds()) : time.getSeconds());
    return "".concat(chalk_1.default.white("[")).concat(chalk_1.default.gray(_Time)).concat(chalk_1.default.white("]"));
}
function getFormattedTime() {
    var time = new Date();
    var _Time = "".concat(time.getHours(), ":").concat(time.getMinutes() < 10 ? "0".concat(time.getMinutes()) : time.getMinutes(), ":").concat(time.getSeconds() < 10 ? "0".concat(time.getSeconds()) : time.getSeconds());
    return "[".concat(_Time, "]");
}
