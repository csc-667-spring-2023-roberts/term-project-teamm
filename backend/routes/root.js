const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
    response.render("home", {
        title: "Hi World!",
        message: "Our first template.",
      });
})

module.exports = router;