import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src/lib/users.json");

export type User = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
};

export function readUsers(): User[] {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data).users;
}

export function writeUsers(users: User[]) {
  fs.writeFileSync(
    dbPath,
    JSON.stringify({ users }, null, 2),
    "utf-8"
  );
}
