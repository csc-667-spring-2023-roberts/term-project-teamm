const express = require("express");

const router = express.Router();

router.post("/:id", (request, response) => {
  const io = request.app.get("io");

  const { message } = request.body;
  const sender = request.session.user.username;

  io.emit("chat-message", { message, sender });
});

module.exports = router;
