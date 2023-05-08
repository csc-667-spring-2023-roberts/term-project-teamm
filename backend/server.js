const express = require("express");
const path = require("path");
const homeRoutes = require("./routes/home");
const requestTime = require("./middleware/request-time");
const createError = require("http-errors");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");


const app = express();
const PORT = process.env.PORT || 3000;

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

app.set("views", path.join(".","backend", "views" ));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "backend", "static")));



app.use(requestTime);
app.use("/",homeRoutes);


app.use((request, response, next) => {
next(createError(404));
});



app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});