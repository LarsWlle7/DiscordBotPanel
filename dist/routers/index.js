"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
var express_1 = require("express");
var Dashboard_1 = require("./Dashboard");
var router = (0, express_1.Router)();
exports.MainRouter = router;
router.use("/dashboard", Dashboard_1.DashboardRouter);
