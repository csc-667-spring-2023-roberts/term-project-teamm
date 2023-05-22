/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.createTable("game_hand", {
    id: "id",
    game_id: {
      type: "integer",
      notNull: true,
    },
    user_id: {
      type: "integer",
      notNull: true,
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
  pgm.dropTable("game_hand");
};
