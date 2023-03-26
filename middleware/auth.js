const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    let token = req.header("Authorization");
    if (!token)
      return res
        .status(401)
        .json({ message: "Please login or signup and try again." });

    const _token = token.replace("Bearer ", "");
    const verified = jwt.verify(_token, process.env.JWT_SECRET);

    req.user = verified.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = auth;
