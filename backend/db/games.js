const db = require("./connection");

const LIST_QUERY = `
SELECT * FROM games g, games_users gu 
WHERE g.id=gu.game_id AND gu.user_id != $1 AND
(SELECT count(*) FROM game_users WHERE game_users.game_id=g.id) =1
`;

const list = async (user_id) => {
  //get all games from games_table
  //where game-users table has 1 entry for
  const results = await db.any(LIST_QUERY, [user_id]);

  return results;
};

const create = async (user_id) => {
  const { id } = await db.one(
    "INSERT INTO games (completed) VALUES (false) RETURNING id"
  );
  await db.none(
    "INSERT INTO game_users (user_id, game_id,current_player) VALUES ($1,$2,true)",
    [user_id, id]
  );

  return { id };
};

module.exports = { create };
