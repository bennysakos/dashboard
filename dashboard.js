const express = require("express");
const router = express.Router();
const path = require('path');
const guildSettings = require(path.join(__dirname, 'guildSettings.json'));


function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/login");
}

router.get("/", checkAuth, (req, res) => {
  const user = req.user;
  const guildId = user.guilds[0]?.id;
  const guild = settings[guildId] || { welcome: {}, moderation: {} };
  res.render("dashboard", { user, guild });
});

module.exports = router;
