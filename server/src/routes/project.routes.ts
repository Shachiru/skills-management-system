import {Router} from "express";
import * as ctrl from "../controllers/project.controller.js";
import {validate} from "../middleware/validate.js";
import {createProjectSchema} from "../validations/project.schema.js";
import {authenticateToken} from "../middleware/auth.js";

const router = Router();

router.post("/", authenticateToken, validate(createProjectSchema), ctrl.createProject);

router.get("/", ctrl.getAllProjects);

router.get("/:id/matches", ctrl.getMatchesForProject);

router.delete("/:id", authenticateToken, ctrl.deleteProject);

router.post("/:id/requirements", ctrl.addProjectRequirement);

router.delete("/:id/requirements/:reqId", authenticateToken, ctrl.deleteProjectRequirement);

export default router;