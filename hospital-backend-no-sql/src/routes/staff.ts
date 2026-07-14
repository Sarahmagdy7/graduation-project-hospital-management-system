import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "../lib/db";

const router = Router();

router.get("/staff", async (req, res) => {
  try {
    const { id } = req.query;
    const rows = id
      ? await db.query("SELECT * FROM staff WHERE id=$1", [id])
      : await db.query("SELECT * FROM staff ORDER BY id");
    res.json(rows);
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

router.post("/staff", async (req, res) => {
  try {
    const { firstName, lastName, role, gender, email, mobile, address, nic, dob, password } = req.body;
    
    let hashedPassword = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const rows = await db.query(
      "INSERT INTO staff (first_name,last_name,role,gender,email,mobile,address,nic,dob,password) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id",
      [firstName, lastName, role, gender, email, mobile, address, nic, dob||null, hashedPassword]
    );
    res.json({ id: rows[0].id, message: "Staff registered!" });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

router.put("/staff/:id", async (req, res) => {
  try {
    const { firstName, lastName, role, gender, email, mobile, address, nic, dob, password } = req.body;
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await db.query(
        "UPDATE staff SET first_name=$1,last_name=$2,role=$3,gender=$4,email=$5,mobile=$6,address=$7,nic=$8,dob=$9,password=$10 WHERE id=$11",
        [firstName, lastName, role, gender, email, mobile, address, nic, dob||null, hashedPassword, req.params.id]
      );
    } else {
      await db.query(
        "UPDATE staff SET first_name=$1,last_name=$2,role=$3,gender=$4,email=$5,mobile=$6,address=$7,nic=$8,dob=$9 WHERE id=$10",
        [firstName, lastName, role, gender, email, mobile, address, nic, dob||null, req.params.id]
      );
    }
    res.json({ message: "Staff updated!" });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

router.delete("/staff/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM staff WHERE id=$1", [req.params.id]);
    res.json({ message: "Staff deleted!" });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

export default router;
