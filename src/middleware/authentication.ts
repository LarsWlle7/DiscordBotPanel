import { NextFunction, Request, Response } from "express";
import config from "../config.json";
import { IUser } from "../database/Schemas/User";

export const validateAuthentication = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser;
  if (!user || !user.guilds) return res.redirect(config.discord.oauth.redirect_url_on_unauthed);
  const guild = user.guilds.find((g) => g.id === config.discord.guildId && g.owner);
  if (guild) return next(null);
  return res.redirect(config.discord.oauth.redirect_url_on_unauthed);
};
