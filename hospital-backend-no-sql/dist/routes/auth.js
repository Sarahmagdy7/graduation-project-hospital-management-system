"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../lib/db");
const router = (0, express_1.Router)();
const JWT_SECRET = process.env["JWT_SECRET"] ?? "hospital_secret_key_2024";
router.post("/auth/login", async (req, res) => {
    const { role, email, password } = req.body;
    if (!role || !email || !password) {
        res.status(400).json({ message: "role, email and password are required" });
        return;
    }
    try {
        const rows = await db_1.db.query("SELECT * FROM users WHERE role = $1 AND email = $2", [role, email]);
        if (rows.length === 0) {
            res.status(401).json({ message: "Email or password is incorrect" });
            return;
        }
        const user = rows[0];
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Email or password is incorrect" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: "8h" });
        res.json({ token, role: user.role, email: user.email });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
