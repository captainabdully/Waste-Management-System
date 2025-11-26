import { sql } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";





// CREATE USER
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, user_category } = req.body;

    const [exist] = await sql.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (exist.length > 0)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = bcrypt.hashSync(password, 10);

    const [result] = await sql.query(
      `INSERT INTO users (name, email, password, role, user_category)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashed, role, user_category]
    );

    res.status(201).json({
      message: "User created successfully",
      user_id: result.insertId,
    });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const [users] = await sql.query("SELECT * FROM users ORDER BY id DESC");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const [user] = await sql.query("SELECT * FROM users WHERE id = ?", [
      req.params.user_id,
    ]);

    if (user.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user: user[0] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const { name, email, role, user_category } = req.body;

    await sql.query(
      `UPDATE users SET name=?, email=?, role=?, user_category=? WHERE id=?`,
      [name, email, role, user_category, req.params.user_id]
    );

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    await sql.query("DELETE FROM users WHERE id=?", [req.params.user_id]);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET USER WITH ROLES
export const getUserWithRoles = async (req, res) => {
  try {
    const [user] = await sql.query(
      "SELECT id, name, email, role, user_category FROM users WHERE id = ?",
      [req.params.user_id]
    );

    if (user.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user: user[0] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN USER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await sql.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0)
      return res.status(400).json({ message: "Invalid email or password" });

    const user = rows[0];

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      {
        user_id: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        user_category: user.user_category,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ADMIN SETUP
export const createAdminSetup = async (req, res) => {
  try {
    const [exist] = await sql.query(
      "SELECT * FROM users WHERE role='admin' LIMIT 1"
    );

    if (exist.length > 0)
      return res.status(400).json({ message: "Admin already exists" });

    const hashed = bcrypt.hashSync("Admin@123", 10);

    const [admin] = await sql.query(
      `INSERT INTO users (name, email, password, role, user_category)
       VALUES (?, ?, ?, ?, ?)`,
      ["System Admin", "admin@system.com", hashed, "admin", "admin"]
    );

    res.status(201).json({
      message: "Admin created successfully",
      admin_id: admin.insertId,
    });
  } catch (error) {
    console.error("Admin setup error:", error);
    res.status(500).json({ message: "Server error creating admin" });
  }
};


export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserWithRoles,
  createAdminSetup,

};
