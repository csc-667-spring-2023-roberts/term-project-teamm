const db = require("./connection");

const LIST_QUERY = `
SELECT g.id, g.created_at FROM games g, game_users gu
WHERE g.id=gu.game_id AND gu.user_id != $1 AND 
(SELECT COUNT(*) FROM game_users WHERE game_users.game_id=g.id)=1
`;

const list = async (user_id) => await db.any(LIST_QUERY, [user_id]);

const create = async (user_id) => {
  const { id } = await db.one(
    "INSERT INTO games (completed) VALUES (false) RETURNING *"
  );
  await db.none(
    "INSERT INTO game_users (user_id, game_id,current_player) VALUES ($1,$2,true)",
    [user_id, id]
  );

  return { id };
};

const JOIN_GAME_SQL =
  "INSERT INTO game_users (game_id, user_id) VALUES ($1,$2)";

const join = (game_id, user_id) => db.none(JOIN_GAME_SQL, [game_id, user_id]);

module.exports = { create, list, join };
