import express, { Router } from "express";
import {
  createUser,
  getAllUser,
  loginUser,
} from "../controller/user.controller";
const router: Router = express.Router();

router.post("/new", createUser);
router.get("/user", getAllUser);
router.post("/login", loginUser);

export default router;
