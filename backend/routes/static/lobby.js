const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
  const { user } = request.session;
  response.render("lobby", { title: "Term Project (Lobby)", ...user });
});

module.exports = router;
