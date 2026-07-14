import { Router } from "express";
import authRouter         from "./auth";
import patientsRouter     from "./patients";
import appointmentsRouter from "./appointments";
import staffRouter        from "./staff";
import medicinesRouter    from "./medicines";
import labRouter          from "./lab";
import invoicesRouter     from "./invoices";
import doctorsRouter      from "./doctors";
import dashboardRouter    from "./dashboard";

const router = Router();
router.get("/healthz", (_req, res) => res.json({ status: "ok" }));
router.use(authRouter);
router.use(patientsRouter);
router.use(appointmentsRouter);
router.use(staffRouter);
router.use(medicinesRouter);
router.use(labRouter);
router.use(invoicesRouter);
router.use(doctorsRouter);
router.use(dashboardRouter);

export default router;
