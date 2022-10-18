import mongoose from "mongoose";
import { logger } from "../managers/logger";
import config from "../config.json";

mongoose
  .connect(config.database)
  .then(() => logger.info("connection with database successful."))
  .catch((e) => logger.error(e, false));
