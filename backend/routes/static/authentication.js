const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../../db/users");

const router = express.Router();

const SALT_ROUNDS = 10;

router.get("/sign-up", (_request, response) => {
  response.render("sign-up", { title: "Term Project" });
});

router.get("/login", (_request, response) => {
  response.render("login", { title: "Term Project" });
});
router.get("/logout", (request, response) => {
  request.session.destroy((error) => {
    console.log({ error });
  });
  response.redirect("/");
});

router.post("/sign-up", async (request, response) => {
  const { username, email, password } = request.body;

  console.log({ email, password });
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  try {
    const { id } = await Users.create(username, email, hash);
    request.session.user = {
      id,
      username,
      email,
    };
    response.redirect("/lobby");
  } catch (error) {
    console.log({ error });

    response.render("sign-up", {
      title: "Term Project",
      username,
      email,
      password,
      message: "Error!",
    });
  }
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;

  try {
    const { id, username, password: hash } = await Users.findByEmail(email);
    const isValidUser = bcrypt.compareSync(password, hash);

    if (isValidUser) {
      request.session.user = {
        id,
        username,
        email,
      };
      response.redirect("/lobby");
    } else {
      throw "User did not provide valid credentials";
    }
  } catch (error) {
    console.log({ error });

    response.render("login", {
      title: "Term Project",
      email,
      message: "Error!",
    });
  }
});

module.exports = router;
