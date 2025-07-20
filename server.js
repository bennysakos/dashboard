const express = require("express");
const session = require("express-session");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Session setup
app.use(session({
  secret: 'verysecretkey',
  resave: false,
  saveUninitialized: false
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new DiscordStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'https://your-render-url.onrender.com/auth/redirect',
  scope: ['identify', 'guilds']
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => res.send("I am alive!"));

// Adjusted require paths — assuming these files are in the project root
app.use("/", require("./auth"));                // auth.js in root
app.use("/dashboard", require("./dashboard")); // dashboard.js in root

// If api/settings.js is inside an api folder, keep the path as is
app.use("/api/settings", require("./api/settings"));

app.listen(PORT, () => console.log(`Dashboard running on http://localhost:${PORT}`));
