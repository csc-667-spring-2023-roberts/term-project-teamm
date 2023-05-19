const express = require("express");
const Games = require("../../db/games");

const router = express.Router();

router.get("/:id", (request, response) => {
  const { id } = request.params;
  const { user } = request.session;

  response.render("games", { id, title: "Term Project (Game)", ...user });
});

module.exports = router;
