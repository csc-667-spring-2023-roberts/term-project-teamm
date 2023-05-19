const express = require("express");
const Games = require("../../db/games");

const router = express.Router();

// router.get("/", async (request,response) => {
//   const {id:user_id} = request.session.user;

//   try{
//     const available_games = await Games.list(user_id);

//     response.json({ games });
//   }
//   catch(error){
//     console.log({error});

//     response.redirect("/lobby");
//   }
// });

router.post("/create", async (request, response) => {
  const { id: user_id } = request.session.user;
  console.log({ user_id });
  try {
    const { id: game_id } = await Games.create(user_id);
    // console.log({ id });
    response.redirect(`/games/${game_id}`);
  } catch (error) {
    console.log({ error });
    response.redirect("/lobby", { error });
  }
});

module.exports = router;
