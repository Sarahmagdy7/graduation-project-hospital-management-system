import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../lib/db";

const router = Router();
const JWT_SECRET = process.env["JWT_SECRET"] ?? "hospital_secret_key_2024";

router.post("/auth/login", async (req, res) => {
  const { role, email, password } = req.body;
  if (!role || !email || !password) {
    res.status(400).json({ message: "role, email and password are required" });
    return;
  }
  try {
    const rows = await db.query(
      "SELECT * FROM users WHERE role = $1 AND email = $2",
      [role, email]
    );
    if (rows.length === 0) { res.status(401).json({ message: "Email or password is incorrect" }); return; }
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { res.status(401).json({ message: "Email or password is incorrect" }); return; }
    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: "8h" });
    res.json({ token, role: user.role, email: user.email });
  } catch (err) { console.error(err); res.status(500).json({ message: "Server error" }); }
});

export default router;
