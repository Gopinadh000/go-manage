import express from 'express';
import {
  projectsDataTable,
  getAllProjectMembers,
} from '../../controllers/projects.controller.js';

const router = express.Router();

router.get('/table', projectsDataTable);
router.get('/members', getAllProjectMembers);
export default router;
