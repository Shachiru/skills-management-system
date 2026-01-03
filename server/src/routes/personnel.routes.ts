import { Router } from "express";
import * as ctrl from "../controllers/personnel.controller.js";
import { validate } from "../middleware/validate.js";
import { personnelSchema } from "../validations/personnel.schema.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protect);

router.get("/", ctrl.getAllPersonnel);
router.post("/", validate(personnelSchema), ctrl.createPersonnel);
router.put("/:id", validate(personnelSchema), ctrl.updatePersonnel);
router.delete("/:id", ctrl.deletePersonnel);
router.post("/:id/skills", ctrl.addSkillToPersonnel);

export default router;