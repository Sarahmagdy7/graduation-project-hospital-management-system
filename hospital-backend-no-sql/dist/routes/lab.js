"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../lib/db");
const router = (0, express_1.Router)();
router.get("/lab", async (req, res) => {
    try {
        const { id } = req.query;
        const rows = id
            ? await db_1.db.query("SELECT * FROM lab_reports WHERE id LIKE $1", [`%${id}%`])
            : await db_1.db.query("SELECT * FROM lab_reports ORDER BY created_at");
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
router.post("/lab", async (req, res) => {
    try {
        const { patientName, doctorName, testName, date, observations } = req.body;
        const countRows = await db_1.db.query("SELECT COUNT(*) as cnt FROM lab_reports");
        const newId = `L-${Number(countRows[0].cnt) + 101}`;
        await db_1.db.query("INSERT INTO lab_reports (id,patient_name,doctor_name,test_name,date,observations,status) VALUES($1,$2,$3,$4,$5,$6,'Completed')", [newId, patientName, doctorName, testName, date || null, observations]);
        res.json({ id: newId, message: "Lab report saved!" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
router.put("/lab/:id", async (req, res) => {
    try {
        const { patientName, doctorName, testName, date, observations, status } = req.body;
        await db_1.db.query("UPDATE lab_reports SET patient_name=$1,doctor_name=$2,test_name=$3,date=$4,observations=$5,status=$6 WHERE id=$7", [patientName, doctorName, testName, date || null, observations, status, req.params.id]);
        res.json({ message: "Lab report updated!" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
router.delete("/lab/:id", async (req, res) => {
    try {
        await db_1.db.query("DELETE FROM lab_reports WHERE id=$1", [req.params.id]);
        res.json({ message: "Lab report deleted!" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
