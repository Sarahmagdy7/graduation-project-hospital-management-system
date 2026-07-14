import { Router } from "express";
import { db } from "../lib/db";

const router = Router();

router.get("/doctors", async (_req, res) => {
  try {
    const rows = await db.query("SELECT * FROM doctors ORDER BY id");
    res.json(rows);
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

router.delete("/doctors/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM doctors WHERE id=$1", [req.params.id]);
    res.json({ message: "Doctor deleted!" });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

export default router;
