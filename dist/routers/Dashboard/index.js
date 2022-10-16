"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRouter = void 0;
var express_1 = require("express");
var config_json_1 = __importDefault(require("../../config.json"));
var router = (0, express_1.Router)();
exports.DashboardRouter = router;
router.get("/", function (req, res) {
    res.render("panel", { _port: config_json_1.default.port + 1, _password: config_json_1.default.socketPassword });
});
