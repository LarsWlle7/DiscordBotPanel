import { Router } from "express";
import { DashboardRouter } from "./Dashboard";

const router = Router();

router.use("/dashboard", DashboardRouter);

export { router as MainRouter };
