import {Router} from "express";
import * as ctrl from "../controllers/project.controller.js";
import {validate} from "../middleware/validate.js";
import {createProjectSchema} from "../validations/project.schema.js";

const router = Router();

router.post("/", validate(createProjectSchema), ctrl.createProject);

router.get("/", ctrl.getAllProjects);

router.get("/:id/matches", ctrl.getMatchesForProject);

export default router;