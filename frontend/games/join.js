const { GAME_CREATED } = require("../../shared/constants");

const gameCreatedHandler = (socket) => {
  socket.on(GAME_CREATED);
};

module.exports = gameCreatedHandler;
