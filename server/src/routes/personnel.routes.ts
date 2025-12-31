import { Router } from "express";
import * as ctrl from "../controllers/personnel.controller.js";
import { validate } from "../middleware/validate.js";
import { personnelSchema } from "../validations/personnel.schema.js";

const router = Router();

router.post("/", validate(personnelSchema), ctrl.createPersonnel);
router.get("/", ctrl.getAllPersonnel);
router.put("/:id", validate(personnelSchema), ctrl.updatePersonnel);
router.delete("/:id", ctrl.deletePersonnel);

export default router;