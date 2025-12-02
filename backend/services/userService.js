
// import { sql } from '../config/db.js';

// class UserService {
//   async createUser(userData) {
//     const {  user_id, name, email, phone_number } = userData;
    
//     const existingUser = await sql`
//       SELECT * FROM users WHERE user_id = ${user_id} OR email = ${email}
//     `;
    
//     if (existingUser.length > 0) {
//       throw new Error('User with this ID or email already exists');
//     }

//     const newUser = await sql`
//       INSERT INTO users (user_id, name, email, phone_number)
//       VALUES (${user_id}, ${name}, ${email}, ${phone_number})
//       RETURNING *
//     `;
    
//     return newUser[0];
//   }

//   async getAllUsers() {
//     return await sql`SELECT * FROM users ORDER BY created_at DESC`;
//   }

//   async getUserById(user_id) {
//     const users = await sql`SELECT * FROM users WHERE user_id = ${user_id}`;
//     return users[0];
//   }

//   async updateUser(user_id, updateData) {
//     const { name, email } = updateData;
    
//     const updatedUser = await sql`
//       UPDATE users
//       SET 
//         name = COALESCE(${name}, name),
//         email = COALESCE(${email}, email)
//       WHERE user_id = ${user_id}
//       RETURNING *
//     `;
    
//     return updatedUser[0];
//   }

//   async deleteUser(user_id) {
//     const deletedUser = await sql`
//       DELETE FROM users WHERE user_id = ${user_id} RETURNING *
//     `;
//     return deletedUser[0];
//   }

//   async getUserWithRoles(user_id) {
//     const userWithRoles = await sql`
//       SELECT u.*, array_agg(ur.role) as roles
//       FROM users u
//       LEFT JOIN user_roles ur ON u.user_id = ur.user_id
//       WHERE u.user_id = ${user_id}
//       GROUP BY u.id, u.user_id, u.name, u.email, u.phone_number, u.created_at
//     `;
    
//     return userWithRoles[0];
//   }
// }

// export default new UserService();

import { sql } from "../config/db.js";
import bcrypt from "bcrypt";

class UserService {
  async createUser(data) {
    const hashed = await bcrypt.hash(data.password, 10);

    const [result] = await sql`
      INSERT INTO users (name, email, password, user_category, user_role)
       VALUES (${data.name}, ${data.email}, ${hashed}, ${data.user_category}, ${data.user_role})
    `;

    return { user_id: result.insertId, ...data, password: undefined };
  }

  async getAllUsers() {
    const [rows] = await sql`SELECT * FROM users`;
    return rows;
  }

  async getUserById(user_id) {
    const [rows] = await sql`
      SELECT * FROM users WHERE id = ${user_id}
    `;
    return rows[0];
  }

  async updateUser(id, data) {
    await sql`
      UPDATE users
      SET name = ${data.name}, email = ${data.email}, user_category = ${data.user_category}, role = ${data.role}
      WHERE id = ${id}
    `;
    return this.getUserById(id);
  }

  async deleteUser(id) {
    return sql`DELETE FROM users WHERE id = ${id}`;
  }

  async getUserWithRoles(user_id) {
    const [rows] = await sql`
      SELECT users.*, user_role.role_category
       FROM users 
       LEFT JOIN user_role ON users.id = user_role.user_id
       WHERE users.id = ${user_id}
    `;
    return rows;
  }


  async login(email, password) {
    const [rows] = await sql`
      SELECT * FROM users WHERE email = ${email} LIMIT 1
    `;  
    const user = rows[0];
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);  
    if (!match) return null;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      user_role: user.user_role,
      user_category: user.user_category
    };
  }
}

export default new UserService();