import express from "express";
import { createProject, getProjects, getProjectById, updateProject, deleteProject, projectsDataTable , getAllProjectMembers} from "../../controllers/projects.controller.js"


const router = express.Router();

router.get('/table', projectsDataTable)

router.get('/members', getAllProjectMembers)
router.post("/", createProject)
router.get("/", getProjects)
router.get("/:id", getProjectById)
router.put("/:id", updateProject)
router.delete("/:id", deleteProject)



export default router