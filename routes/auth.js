import express from "express";
import passport from "passport";

const routerAuth = express.Router();

// @desc      Auth with Google
// @route     GET /auth/google
// @access    Private

routerAuth.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// @desc      Google auth callback
// @route     GET /auth/google/callback
// @access    Private

routerAuth.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// @desc      Logout User
// @route     GET /auth/logout
// @access    Private

routerAuth.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default routerAuth;
