"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../lib/db");
const router = (0, express_1.Router)();
router.get("/appointments", async (req, res) => {
    try {
        const { id } = req.query;
        const rows = id
            ? await db_1.db.query("SELECT * FROM appointments WHERE id=$1", [id])
            : await db_1.db.query("SELECT * FROM appointments ORDER BY id");
        res.json(rows.map((r) => ({ ...r, name: `${r.first_name} ${r.last_name}`, role: "Patient" })));
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
router.post("/appointments", async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, nic, dob, gender, date, time, department, doctor, address } = req.body;
        const rows = await db_1.db.query("INSERT INTO appointments (first_name,last_name,email,mobile,nic,dob,gender,date,time,department,doctor,address,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'Confirmed') RETURNING id", [firstName, lastName, email, mobile, nic, dob || null, gender, date || null, time, department, doctor, address]);
        res.json({ id: rows[0].id, message: "Appointment Registered Successfully!" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
router.put("/appointments/:id", async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, nic, dob, gender, date, time, department, doctor, address, status } = req.body;
        await db_1.db.query("UPDATE appointments SET first_name=$1,last_name=$2,email=$3,mobile=$4,nic=$5,dob=$6,gender=$7,date=$8,time=$9,department=$10,doctor=$11,address=$12,status=$13 WHERE id=$14", [firstName, lastName, email, mobile, nic, dob || null, gender, date || null, time, department, doctor, address, status ?? "Confirmed", req.params.id]);
        res.json({ message: "Appointment Updated!" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
router.patch("/appointments/:id/status", async (req, res) => {
    try {
        await db_1.db.query("UPDATE appointments SET status=$1 WHERE id=$2", [req.body.status, req.params.id]);
        res.json({ message: "Status updated!" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
router.delete("/appointments/:id", async (req, res) => {
    try {
        await db_1.db.query("DELETE FROM appointments WHERE id=$1", [req.params.id]);
        res.json({ message: "Appointment deleted!" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
