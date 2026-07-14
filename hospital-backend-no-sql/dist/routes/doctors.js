"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../lib/db");
const router = (0, express_1.Router)();
router.get("/doctors", async (_req, res) => {
    try {
        const rows = await db_1.db.query("SELECT * FROM doctors ORDER BY id");
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
router.delete("/doctors/:id", async (req, res) => {
    try {
        await db_1.db.query("DELETE FROM doctors WHERE id=$1", [req.params.id]);
        res.json({ message: "Doctor deleted!" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
