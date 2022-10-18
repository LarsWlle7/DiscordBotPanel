import { client } from "..";
// @ts-ignore
import dc_config from "../../../data/bot_data.json";
import { logger } from "../../managers/logger";

export const RequestBotStart = () => {
  if (client.isReady()) return logger.warn("Discord bot is already online.");
  logger.info("Starting bot");
  try {
    client
      // @ts-ignore
      .login(dc_config.token)
      .then(() => {
        logger.discord("Discord bot is now online.", "client.login->Promise");
      })
      .catch((err: any) => {
        if (err.code === "TokenInvalid") logger.warn("Bot couldn't start: token is either invalid or missing.");
        logger.fatal(`DiscordError: ${err.code}`, false);
        logger.debug("Discord Login Status: Offline.", "src/discord/utils/index.ts");
      });
  } catch (error) {
    logger.fatal(error, false);
  }
};

export const RequestBotDestroy = () => {
  if (!client.isReady()) return logger.warn("Discord bot is not online.");
  logger.info("Destroying bot");
  try {
    client.destroy();
    logger.discord("Discord bot is now offline.", "client.destroy");
  } catch (error) {
    logger.fatal(error, false);
  }
};
