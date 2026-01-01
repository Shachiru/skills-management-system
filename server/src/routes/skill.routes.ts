import { Router } from "express";
import * as ctrl from "../controllers/skill.controller.js";
import { validate } from "../middleware/validate.js";
import { skillSchema, assignSkillSchema } from "../validations/skill.schema.js";

const router = Router();

router.post("/", validate(skillSchema), ctrl.createSkill);
router.get("/", ctrl.getAllSkills);
router.post("/assign", validate(assignSkillSchema), ctrl.assignSkillToPersonnel);

export default router;