import {Router} from "express";
import * as ctrl from "../controllers/project.controller.js";
import {validate} from "../middleware/validate.js";
import {createProjectSchema} from "../validations/project.schema.js";
import {authenticateToken} from "../middleware/auth.js";

const router = Router();

router.post("/", authenticateToken, validate(createProjectSchema), ctrl.createProject);

router.get("/", ctrl.getAllProjects);

router.get("/:id/matches", ctrl.getMatchesForProject);

export default router;