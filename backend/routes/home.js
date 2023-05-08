const express = require("express");

const router = express.Router();

router.get("/:name?", (request,response) => {
    const {name} = request.params;



    response.render("home",{ name });
});

module.exports = router;