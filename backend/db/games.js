const db = require("./connection");

const LIST_QUERY = `
SELECT g.id, g.created_at FROM games g, game_users gu
WHERE g.id=gu.game_id AND gu.user_id != $1 AND 
(SELECT COUNT(*) FROM game_users WHERE game_users.game_id=g.id)=1
`;
const INITIAL_DECK =
  "INSERT INTO game_hand (user_id,game_id,card_id) SELECT 0, $1, id FROM game_deck ORDER by RANDOM()";

const DRAW_CARDS =
  "UPDATE game_hand SET user_id=$2 WHERE id IN (SELECT id FROM game_hand WHERE user_id=0 AND game_id=$1 LIMIT 7)";

const DISCARD =
  "UPDATE game_hand SET user_id=-1 WHERE game_id=$1 AND card_id=$2";

const deck = async (user_id) => {
  const unoDeck = [];

  const colors = ["1", "2", "3", "4"];
  const numbers = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  let cardId = 1;

  colors.forEach((color, colorIndex) => {
    numbers.forEach((number) => {
      unoDeck.push({ id: cardId, color: colorIndex + 1, number: number });
      cardId++;
    });
  });

  unoDeck.push(
    ...Array.from({ length: 4 }, () => ({
      id: cardId++,
      color: 0,
      number: "13",
    }))
  );

  unoDeck.push(
    ...Array.from({ length: 4 }, () => ({
      id: cardId++,
      color: 0,
      number: "14",
    }))
  );

  console.log(unoDeck);

  for (const card of unoDeck) {
    db.none(
      "INSERT INTO game_deck (id, card_color,card_number) VALUES ($1, $2, $3)",
      [card.id, card.color, card.number]
    );
    const values = [card.id, card.color, card.number];
  }
};

const list = async (user_id) => await db.any(LIST_QUERY, [user_id]);

const create = async (user_id) => {
  const { id } = await db.one(
    "INSERT INTO games (completed) VALUES (false) RETURNING *"
  );
  await db.none(
    "INSERT INTO game_users (user_id, game_id,current_player) VALUES ($1,$2,true)",
    [user_id, id]
  );

  await db.none(INITIAL_DECK, [id]);
  await db.none(DRAW_CARDS, [id, user_id]);
  const { card_id } = await db.one(
    "SELECT card_id FROM game_hand WHERE user_id=0 AND game_id=$1 LIMIT 1",
    [id]
  );

  await db.none(DISCARD, [id, card_id]);

  return { id };
};

const JOIN_GAME_SQL =
  "INSERT INTO game_users (game_id, user_id) VALUES ($1,$2)";

const join = async (game_id, user_id) => {
  await db.none(JOIN_GAME_SQL, [game_id, user_id]);
  await db.none(DRAW_CARDS, [game_id, user_id]);
};

module.exports = { create, list, join, deck };
