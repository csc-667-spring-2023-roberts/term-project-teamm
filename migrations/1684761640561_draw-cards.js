/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.createTable("draw_cards", {
    id: "id",
    game_id: {
      type: "integer",
      notNull: true,
      unique: true,
    },
    user_id: {
      type: "varchar(256)",
      notNull: true,
      unique: true,
    },
    card_id: {
      type: "integer",
      notNull: true,
    },
  });
};

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable("game_deck");
};
