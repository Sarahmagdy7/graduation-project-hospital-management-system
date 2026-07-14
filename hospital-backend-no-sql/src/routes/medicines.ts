import { Router } from "express";
import { db } from "../lib/db";

const router = Router();

router.get("/medicines", async (_req, res) => {
  try {
    const rows = await db.query("SELECT * FROM medicines ORDER BY id");
    res.json(rows);
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

router.post("/medicines", async (req, res) => {
  try {
    const { name, expire, mfg, price, qty } = req.body;
    const rows = await db.query(
      "INSERT INTO medicines (name,expire,mfg,price,qty) VALUES($1,$2,$3,$4,$5) RETURNING id",
      [name, expire||null, mfg||null, price, qty]
    );
    res.json({ id: rows[0].id, message: "Medicine added!" });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

router.put("/medicines/:id", async (req, res) => {
  try {
    const { name, expire, mfg, price, qty } = req.body;
    await db.query(
      "UPDATE medicines SET name=$1,expire=$2,mfg=$3,price=$4,qty=$5 WHERE id=$6",
      [name, expire||null, mfg||null, price, qty, req.params.id]
    );
    res.json({ message: "Medicine updated!" });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

router.delete("/medicines/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM medicines WHERE id=$1", [req.params.id]);
    res.json({ message: "Medicine deleted!" });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

export default router;
