import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
}

export async function getUserByEmail(
  email: string
): Promise<AuthUser | null> {
  const rows = await sql`
    SELECT
      id,
      name,
      email,
      password_hash AS "passwordHash"
    FROM users
    WHERE LOWER(email) = LOWER(${email})
    LIMIT 1
  `;

  if (!rows[0]) {
    return null;
  }

  return rows[0] as AuthUser;
}