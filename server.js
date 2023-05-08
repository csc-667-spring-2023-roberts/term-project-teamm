const path = require("path");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const express = require("express");
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
const testRoutes = require("./routes/test/index.js");

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// if (process.env.NODE_ENV === "development") {
//   const liveReloadServer = livereload.createServer();
//   liveReloadServer.watch(path.join(".", "backend", "static"));
//   liveReloadServer.server();
// }

app.set("views", path.join(__dirname, "backend", "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "backend", "static")));
app.use("/test", testRoutes);

const rootRoutes = require("./backend/routes/root");
app.use("/", rootRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use((request, response, next) => {
  next(createError(404));
});
