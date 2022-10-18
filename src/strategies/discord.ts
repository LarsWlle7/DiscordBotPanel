import passport from "passport";
import { Profile, Strategy } from "passport-discord";
import { VerifyCallback } from "passport-oauth2";
import User from "../database/Schemas/User";
import { logger } from "../managers/logger";
import config from "../config.json";

passport.serializeUser((user: any, done) => {
  return done(null, user.id);
});
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    return user ? done(null, user) : done(null, null);
  } catch (err) {
    console.error(err);
    return done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      clientID: config.discord.oauth.client_id!,
      clientSecret: config.discord.oauth.secret!,
      callbackURL: config.discord.oauth.callback_url!,
      scope: ["identify", "guilds"],
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      const { id: discordId } = profile;
      try {
        const existingUser = await User.findOneAndUpdate({ discordId }, { accessToken, refreshToken }, { new: true });
        if (existingUser) return done(null, existingUser);
        const newUser = new User({
          discordId,
          accessToken,
          refreshToken,
        });
        const savedUser = await newUser.save();
        return done(null, savedUser);
      } catch (error) {
        logger.error(error, false);
        return done(error as any, undefined);
      }
    }
  )
);
