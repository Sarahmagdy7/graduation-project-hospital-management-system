import { Router } from "express";
import { db } from "../lib/db";

const router = Router();

router.get("/dashboard/stats", async (_req, res) => {
  try {
    const [p] = await db.query("SELECT COUNT(*) as cnt FROM patients");
    const [doc] = await db.query("SELECT COUNT(*) as cnt FROM doctors");
    const [m] = await db.query("SELECT COUNT(*) as cnt FROM medicines");
    const [l] = await db.query("SELECT COUNT(*) as cnt FROM lab_reports");
    const [a] = await db.query("SELECT COUNT(*) as cnt FROM appointments");
    res.json({
      totalPatients:     Number(p.cnt),
      totalDoctors:      Number(doc.cnt),
      totalMedicines:    Number(m.cnt),
      totalLabs:         Number(l.cnt),
      totalAppointments: Number(a.cnt),
      totalWards: 20
    });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

export default router;
