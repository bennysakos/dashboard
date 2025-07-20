const express = require("express");
const router = express.Router();
const fs = require("fs");

const settingsPath = "./models/guildSettings.json";
let settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

router.post("/welcome", (req, res) => {
  const guildId = req.user.guilds[0].id;
  if (!settings[guildId]) settings[guildId] = {};

  settings[guildId].welcome = {
    enabled: req.body.enabled === 'on',
    channel: req.body.channel,
    message: req.body.message
  };

  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  res.redirect("/dashboard");
});

router.post("/moderation", (req, res) => {
  const guildId = req.user.guilds[0].id;
  if (!settings[guildId]) settings[guildId] = {};

  settings[guildId].moderation = {
    enabled: req.body.enabled === 'on',
    autoDeleteLinks: req.body.autoDeleteLinks === 'on',
    badWords: req.body.badWords.split(',').map(w => w.trim()),
    modRoles: req.body.modRoles.split(',').map(r => r.trim())
  };

  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  res.redirect("/dashboard");
});

module.exports = router;
