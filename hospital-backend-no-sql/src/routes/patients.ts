import { Router } from "express";
import { db } from "../lib/db";

const router = Router();

router.get("/patients", async (req, res) => {
  try {
    const { id } = req.query;
    const rows = id
      ? await db.query("SELECT * FROM patients WHERE id = $1", [id])
      : await db.query("SELECT * FROM patients ORDER BY id");
    res.json(rows);
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

router.post("/patients", async (req, res) => {
  try {
    const { firstName, lastName, nic, email, mobile, dob, gender, address } = req.body;
    const rows = await db.query(
      "INSERT INTO patients (first_name,last_name,nic,email,mobile,dob,gender,address) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id",
      [firstName, lastName, nic, email, mobile, dob || null, gender, address]
    );
    res.json({ id: rows[0].id, message: "Patient added successfully!" });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

router.put("/patients/:id", async (req, res) => {
  try {
    const { firstName, lastName, nic, email, mobile, dob, gender, address } = req.body;
    await db.query(
      "UPDATE patients SET first_name=$1,last_name=$2,nic=$3,email=$4,mobile=$5,dob=$6,gender=$7,address=$8 WHERE id=$9",
      [firstName, lastName, nic, email, mobile, dob || null, gender, address, req.params.id]
    );
    res.json({ message: "Patient updated successfully!" });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

router.delete("/patients/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM patients WHERE id=$1", [req.params.id]);
    res.json({ message: "Patient deleted!" });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

export default router;
