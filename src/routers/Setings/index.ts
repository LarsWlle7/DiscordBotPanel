import { Router } from "express";
import config from "../../config.json";
import { validateAuthentication } from "../../middleware/authentication";

const router = Router();

router.get("/", validateAuthentication, (_, res) => {
  res.render("settings", { _port: config.port + 1, _password: config.socketPassword });
});

export { router as SettingsRouter };
