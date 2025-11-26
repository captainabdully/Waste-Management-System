
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sql } from "../config/db.js";
import e from "express";




// LOGIN CONTROLLER
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const [user] = await sql.query("SELECT * FROM users WHERE email = ?", [email]);

    if (user.length === 0)
      return res.status(400).json({ message: "Invalid email or password" });

    const validPass = bcrypt.compareSync(password, user[0].password);

    if (!validPass)
      return res.status(400).json({ message: "Invalid email or password" });

    // JWT PAYLOAD
    const tokenPayload = {
      user_id: user[0].id,
      role: user[0].role,
      user_category: user[0].user_category
    };

    const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    res.status(200).json({
      message: "Login successful",
      token: accessToken,
      user: tokenPayload,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// REFRESH TOKEN CONTROLLER
export async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;  
    if (!refreshToken)
      return res.status(400).json({ message: "Refresh token missing" });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err)
        return res.status(403).json({ message: "Invalid refresh token" });
        const newToken = jwt.sign(
            { user_id: decoded.user_id },
            process.env.JWT_SECRET,

            { expiresIn: "7d" }
        );
        res.status(200).json({ token: newToken });
    });
    } catch (error) {
    res.status(500).json({ message: "Server error" });
    }
};

export default {
  login,
  refreshToken,
};

