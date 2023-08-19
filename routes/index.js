import express from "express";
import ensure from "../middleware/auth.js";

const router = express.Router();

// @desc      Login/Landing Page
// @route     GET /
// @access    Public

router.get("/", ensure.ensureGuest, (req, res) => {
  res.render("login", { title: "login page" });
});

// @desc      Dashboard
// @route     GET /dashboard
// @access    Private

router.get("/dashboard", ensure.ensureAuth, (req, res) => {
  res.render("dashboard", { title: "dashboard page" });
});

export default router;
