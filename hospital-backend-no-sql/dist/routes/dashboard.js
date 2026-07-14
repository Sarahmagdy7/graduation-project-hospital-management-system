"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../lib/db");
const router = (0, express_1.Router)();
router.get("/dashboard/stats", async (_req, res) => {
    try {
        const [p] = await db_1.db.query("SELECT COUNT(*) as cnt FROM patients");
        const [doc] = await db_1.db.query("SELECT COUNT(*) as cnt FROM doctors");
        const [m] = await db_1.db.query("SELECT COUNT(*) as cnt FROM medicines");
        const [l] = await db_1.db.query("SELECT COUNT(*) as cnt FROM lab_reports");
        const [a] = await db_1.db.query("SELECT COUNT(*) as cnt FROM appointments");
        res.json({
            totalPatients: Number(p.cnt),
            totalDoctors: Number(doc.cnt),
            totalMedicines: Number(m.cnt),
            totalLabs: Number(l.cnt),
            totalAppointments: Number(a.cnt),
            totalWards: 20
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
