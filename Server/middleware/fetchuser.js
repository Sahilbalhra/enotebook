var jwt = require("jsonwebtoken");
const JWT_SECRET = "sahilisgoodboy";

const fetchUser = (req, res, next) => {
  //get the user from jwt token and add id to req object

  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({
      error: "Plz authenticate using a valid token",
    });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Plz authenticate using a valid token",
      error: error.message,
    });
  }
};

module.exports = fetchUser;
