const path = require("path");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const express = require("express");
const livereload = "livereload";
const connectLiveReload = "connect-livereload";
const testRoutes = require("./static/index.js");

const gameRoutes = require("./routes/static/game.js");
const homeRoutes = require("./routes/static/home.js");
const lobbyRoutes = require("./routes/static/lobby.js");
const profileRoutes = require("./routes/static/profile.js");
const signUpRoutes = require("./routes/static/sign-up.js");

require("dotenv").config();
const db = require("./db/connection.js");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  const livereload = require("livereload");
  const connectLiveReload = require("connect-livereload");

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, "backend", "static"));
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  app.use(connectLiveReload());
}

app.set("views", path.join(__dirname, "backend", "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "backend", "static")));
app.use("/", homeRoutes);
app.use("/games", gameRoutes);
app.use("/lobby", lobbyRoutes);
app.use("/profile", profileRoutes);
app.use("/sign-up", signUpRoutes);
app.use("/test", testRoutes);

const rootRoutes = require("./routes/root");
app.use("/", rootRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use((request, response, next) => {
  next(createError(404));
});
