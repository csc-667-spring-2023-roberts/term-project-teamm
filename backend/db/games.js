const db = require("./connection");

const create = async (user_id) => {
  const { id } = await db.one(
    "INSERT INTO games (completed) VALUES (false) RETURNING id"
  );
  await db.none(
    "INSERT INTO game_users (user_id, game_id,current_player) VALUES ($1,$2,true)",
    [user_id, id]
  );

  return id;
};

module.exports = { create };
