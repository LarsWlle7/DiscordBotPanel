import { Router } from "express";
import { DashboardRouter } from "./Dashboard";
import AuthRouter from "./auth/index";
import { BotRouter } from "./bot";
import { SettingsRouter } from "./Setings";

const router = Router();

router.use("/dashboard", DashboardRouter);
router.use("/settings", SettingsRouter);
router.use("/bot", BotRouter);
router.use("/api/auth", AuthRouter);

export { router as MainRouter };
