import { Router } from "express";
import passport from "passport";
import { IUser } from "../../database/Schemas/User";
import { validateAuthentication } from "../../middleware/authentication";
const router = Router();

router.get("/discord", passport.authenticate("discord"), (req, res) => {
  res.send(200);
});

router.get("/discord/redirect", passport.authenticate("discord"), (req, res) => {
  res.redirect("http://localhost/dashboard/");
});

router.get("/authenticated", validateAuthentication, async (req, res) => {
  const user = req.user as IUser;
  if (user) return res.send({ loggedIn: true });
});

export default router;
