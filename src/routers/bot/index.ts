import { Router } from "express";
import { RequestBotDestroy, RequestBotStart } from "../../discord/utils";
import { logger } from "../../managers/logger";
import { validateAuthentication } from "../../middleware/authentication";
import fs from "fs";

const router = Router();

router.get("/request_start", validateAuthentication, () => {
  logger.info("Bot start request sent.");
  RequestBotStart();
});

router.get("/request_destroy", validateAuthentication, () => {
  logger.info("Bot destroy request sent.");
  RequestBotDestroy();
});

router.put("/request_token_change", validateAuthentication, (req) => {
  const rawData = fs.readFileSync("./data/bot_data.json", "utf-8");
  const data = JSON.parse(rawData);
  data.token = req.headers.newtoken || "";
  fs.writeFileSync("./data/bot_data.json", JSON.stringify(data), "utf-8");
});

export { router as BotRouter };
