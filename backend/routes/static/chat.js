const express = require("express");

const router = express.Router();

router.get("/:id", (request, response) => {
  const io = request.app.get("io");
  console.log({ body: request.body });
  const sender = request.session.user.username;

  io.emmit("chat-message", { message, sender });
});

module.exports = router;
