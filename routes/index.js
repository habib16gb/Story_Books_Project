import express from "express";

const router = express.Router();

// @desc      Login/Landing Page
// @route     GET /
// @access    Public

router.get("/", (req, res) => {
  res.render("login", { title: "login page" });
});

// @desc      Dashboard
// @route     GET /dashboard
// @access    Private

router.get("/dashboard", (req, res) => {
  res.render("dashboard", { title: "dashboard page" });
});

export default router;
