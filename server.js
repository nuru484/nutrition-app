const express = require("express");
const passport = require("passport");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const methodOverride = require("method-override");

const initializePassport = require("./src/config/passport-config");
const routes = require("./src/routes/index-routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const publicDir = path.join(__dirname, "src/public");
app.use(express.static(publicDir));

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
initializePassport(passport);

app.use("/", routes);

async function startServer() {
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`App listening on localhost port ${port}`);
    console.log("\x1b[34m%s\x1b[0m", ` http://localhost:${port}/`);
  });
}

startServer();
