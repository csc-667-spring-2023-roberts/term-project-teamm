const express = require("express");
const Games = require("../../db/games");

const router = express.Router();

router.post("/create", async (request, response) => {
  const { id: user_id } = request.session.user;
  try {
    const { id } = await Games.create(user_id);
    console.log({ id });
    response.redirect(`/games/${id}`);
  } catch (error) {
    console.log({ error });
    response.redirect("/lobby", { error });
  }
});

router.get("/:id", (request, response) => {
  const { id } = request.params;
  const { user } = request.session;

  response.render("games", { id, title: "Term Project (Game)", ...user });
});

module.exports = router;
