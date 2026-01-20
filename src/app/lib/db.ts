import fs from "fs";
import path from "path";

const isVercel = !!process.env.VERCEL;

const localPath = path.join(process.cwd(), "src/app/lib/users.json");
const vercelPath = path.join("/tmp", "users.json");

const dbPath = isVercel ? vercelPath : localPath;

function ensureDb() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [] }, null, 2), "utf-8");
  }
}

export type User = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
};

export function readUsers(): User[] {
  ensureDb();
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data).users;
}

export function writeUsers(users: User[]) {
  ensureDb();
  fs.writeFileSync(dbPath, JSON.stringify({ users }, null, 2), "utf-8");
}