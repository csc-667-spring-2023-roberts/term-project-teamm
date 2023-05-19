const express = require("express");
const Games = require("../../db/games");

const router = express.Router();

router.get("/", async (request, response) => {
  const { id: user_id } = request.session.user;
  try {
    const available_games = await Games.list(user_id);
    response.render("lobby", { games: available_games });
  } catch (error) {
    console.log({ error });
    response.render("lobby", { games: [] });
  }
});

module.exports = router;
