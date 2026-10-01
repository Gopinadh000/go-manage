import express from "express";
import { createUserInTenant, getUsersTable } from "../../controllers/users.controller.js";


const router = express.Router();


router.post("/user",  createUserInTenant);
router.get("/table", getUsersTable)

export default router;