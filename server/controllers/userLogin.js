const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function userLogin(req, res) {
  const { user_email, user_password } = req.body; // Destructure correct variables

  const query = `SELECT * FROM users WHERE user_email = ?`;

  try {
    const [availableUser] = await db.query(query, [user_email]);

    if (availableUser.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = availableUser[0].user_password;
    const isMatch = await bcrypt.compare(user_password, hashedPassword);

    if (!isMatch) {
      return res.status(401).json({ error: "Password doesn't match" });
    }

    const token = jwt.sign(
      {
        user_id: availableUser[0].user_id, 
        user_email: availableUser[0].user_email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ accesstoken: token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = userLogin;