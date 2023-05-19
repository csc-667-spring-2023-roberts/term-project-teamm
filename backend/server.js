const express = require("express");
const createError = require("http-errors");
const path = require("path");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const http = require("http");
const { Server } = require("socket.io");

const requestTime = require("./middleware/request-time");

const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const db = require("./db/connection");
const requireAuthentication = require("./middleware/require-authentication");

const homeRoutes = require("./routes/static/home");
const apiGamesRoutes = require("./routes/api/games");
const gamesRoutes = require("./routes/static/games");
const lobbyRoutes = require("./routes/static/lobby");
const profileRoutes = require("./routes/static/profile");
const authenticationRoutes = require("./routes/static/authentication");
const chatRoutes = require("./routes/static/chat");

const app = express();
const PORT = process.env.PORT || 3000;

const sessionMiddleWare = session({
  store: new pgSession({ pgPromise: db }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
});
app.use(sessionMiddleWare);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const server = http.createServer(app);
const io = new Server(server);
io.engine.use(sessionMiddleWare);
io.on("connection", (_socket) => {
  console.log("Connection");
});

app.set("io", io);

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

// const testRoutes = require("./routes/testing/index");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));

app.use(requestTime);
app.use("/", homeRoutes);
app.use("/api/games", requireAuthentication, apiGamesRoutes);
app.use("/games", requireAuthentication, gamesRoutes);
app.use("/lobby", requireAuthentication, lobbyRoutes);
app.use("/authentication", authenticationRoutes);
app.use("/profile", profileRoutes);
app.use("/chat", requireAuthentication, chatRoutes);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use((request, response, next) => {
  next(createError(404));
});
