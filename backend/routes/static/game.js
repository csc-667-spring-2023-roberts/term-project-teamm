const express = require("express");
const router = express.Router();

router.get("/:id", (_request, response) => {
  const { id } = request.params;
  response.render("game", {
    title: "Term Project (Game)",
    id,
  });
});

module.exports = router;
