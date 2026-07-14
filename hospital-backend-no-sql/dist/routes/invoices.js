"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../lib/db");
const router = (0, express_1.Router)();
router.get("/invoices", async (req, res) => {
    try {
        const { id } = req.query;
        const rows = id
            ? await db_1.db.query("SELECT * FROM invoices WHERE id=$1", [id])
            : await db_1.db.query("SELECT * FROM invoices ORDER BY id");
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
router.post("/invoices", async (req, res) => {
    try {
        const { patient, lab, ward, doctor, treatment, amount } = req.body;
        const rows = await db_1.db.query("INSERT INTO invoices (patient,lab,ward,doctor,treatment,amount) VALUES($1,$2,$3,$4,$5,$6) RETURNING id", [patient, lab, ward, doctor, treatment, amount]);
        res.json({ id: rows[0].id, message: "Bill Generated Successfully!" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
router.delete("/invoices/:id", async (req, res) => {
    try {
        await db_1.db.query("DELETE FROM invoices WHERE id=$1", [req.params.id]);
        res.json({ message: "Invoice deleted!" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
