import sql from "../config/db.js";

export const createUserService = async ({ user_id, name, email }) => {
  const result = await sql`
    INSERT INTO users (user_id, name, email)
    VALUES (${user_id}, ${name}, ${email})
    RETURNING *
  `;
  return result[0];
};

export const getAllUsersService = async () => {
  return await sql`SELECT * FROM users ORDER BY id DESC`;
};
