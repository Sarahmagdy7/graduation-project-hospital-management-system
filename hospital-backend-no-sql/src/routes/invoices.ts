import { Router } from "express";
import { db } from "../lib/db";

const router = Router();

router.get("/invoices", async (req, res) => {
  try {
    const { id } = req.query;
    const rows = id
      ? await db.query("SELECT * FROM invoices WHERE id=$1", [id])
      : await db.query("SELECT * FROM invoices ORDER BY id");
    res.json(rows);
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

router.post("/invoices", async (req, res) => {
  try {
    const { patient, lab, ward, doctor, treatment, amount } = req.body;
    const rows = await db.query(
      "INSERT INTO invoices (patient,lab,ward,doctor,treatment,amount) VALUES($1,$2,$3,$4,$5,$6) RETURNING id",
      [patient, lab, ward, doctor, treatment, amount]
    );
    res.json({ id: rows[0].id, message: "Bill Generated Successfully!" });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

router.delete("/invoices/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM invoices WHERE id=$1", [req.params.id]);
    res.json({ message: "Invoice deleted!" });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

export default router;
