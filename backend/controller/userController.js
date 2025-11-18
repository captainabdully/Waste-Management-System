const userService = require('../services/userService');

class UserController {
  async createUser(req, res) {
    try {
      const { user_id, name, email, phone_number } = req.body;
      
      if (!user_id || !name || !email) {
        return res.status(400).json({ message: "user_id, name, and email are required" });
      }

      const newUser = await userService.createUser(req.body);
      
      res.status(201).json({
        message: "User created successfully",
        data: newUser
      });
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.message.includes('already exists')) {
        return res.status(409).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      
      res.status(200).json({
        message: "Users fetched successfully",
        data: users
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUserById(req, res) {
    try {
      const { user_id } = req.params;
      const user = await userService.getUserById(user_id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User fetched successfully",
        data: user
      });
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateUser(req, res) {
    try {
      const { user_id } = req.params;
      const { name, email } = req.body;

      if (!name && !email) {
        return res.status(400).json({ message: "At least one field (name or email) is required" });
      }

      const updatedUser = await userService.updateUser(user_id, req.body);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User updated successfully",
        data: updatedUser
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { user_id } = req.params;
      const deletedUser = await userService.deleteUser(user_id);
      
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User deleted successfully",
        deleted: deletedUser
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUserWithRoles(req, res) {
    try {
      const { user_id } = req.params;
      
      if (!user_id) {
        return res.status(400).json({ message: "user_id is required" });
      }

      const userWithRoles = await userService.getUserWithRoles(user_id);
      
      if (!userWithRoles) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ data: userWithRoles });
    } catch (error) {
      console.error("Error fetching user with roles:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new UserController();