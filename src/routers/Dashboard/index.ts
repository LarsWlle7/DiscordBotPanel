import { Router } from "express";
import config from "../../config.json";

const router = Router();

router.get("/", (req, res) => {
  res.render("panel", { _port: config.port + 1, _password: config.socketPassword });
});

export { router as DashboardRouter };
