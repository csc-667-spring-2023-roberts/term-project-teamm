const http = require("http");
const { Server } = require("socket.io");

const initSocket = (app) => {
  const server = http.createServer(app);
  // const io = new Server(server);

  // io.engine.use(sessionMiddleWare);
  return new Server(server);
};

module.exports = initSocket;
