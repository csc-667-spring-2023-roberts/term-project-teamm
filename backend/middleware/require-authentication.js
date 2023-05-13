const requireAuthentication = (request, response, next) => {
  const { user } = request.session;

  if (user === undefined || user === null) {
    console.log("you stuck");
    console.log({ user });
    response.redirect("/authentication/login");
  } else {
    next();
  }
};

module.exports = requireAuthentication;
