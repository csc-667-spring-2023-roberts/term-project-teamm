const express = require("express");

const router = express.Router();

router.get("/", (_request, response) => {
  response.render("sign-up", { title: "Term Project (Sign up)" });
});

module.exports = router;
