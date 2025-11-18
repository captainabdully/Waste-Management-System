
import { sql } from '../config/db.js';

class UserService {
  async createUser(userData) {
    const { user_id, name, email, phone_number } = userData;
    
    const existingUser = await sql`
      SELECT * FROM users WHERE user_id = ${user_id} OR email = ${email}
    `;
    
    if (existingUser.length > 0) {
      throw new Error('User with this ID or email already exists');
    }

    const newUser = await sql`
      INSERT INTO users (user_id, name, email, phone_number)
      VALUES (${user_id}, ${name}, ${email}, ${phone_number})
      RETURNING *
    `;
    
    return newUser[0];
  }

  async getAllUsers() {
    return await sql`SELECT * FROM users ORDER BY created_at DESC`;
  }

  async getUserById(user_id) {
    const users = await sql`SELECT * FROM users WHERE user_id = ${user_id}`;
    return users[0];
  }

  async updateUser(user_id, updateData) {
    const { name, email } = updateData;
    
    const updatedUser = await sql`
      UPDATE users
      SET 
        name = COALESCE(${name}, name),
        email = COALESCE(${email}, email)
      WHERE user_id = ${user_id}
      RETURNING *
    `;
    
    return updatedUser[0];
  }

  async deleteUser(user_id) {
    const deletedUser = await sql`
      DELETE FROM users WHERE user_id = ${user_id} RETURNING *
    `;
    return deletedUser[0];
  }

  async getUserWithRoles(user_id) {
    const userWithRoles = await sql`
      SELECT u.*, array_agg(ur.role) as roles
      FROM users u
      LEFT JOIN user_roles ur ON u.user_id = ur.user_id
      WHERE u.user_id = ${user_id}
      GROUP BY u.id, u.user_id, u.name, u.email, u.phone_number, u.created_at
    `;
    
    return userWithRoles[0];
  }
}

export default new UserService();