const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization; // Use lowercase

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "User is not authorized or token is missing" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Admin is not authorized!" });
      }

      req.admin = decoded;
      next();
    });
  } else {
    return res.status(401).json({ error: "Authorization header is missing or invalid" });
  }
};

module.exports = { validateToken };