import { Router } from "express";
import { UserController } from "../controllers/userController";
import { isLoggedIn } from "../middlewares/authentication";
import catchAsync from "../middlewares/catchAsync";
const router = Router()

router.post("/register", catchAsync(UserController.createUser));
router.post("/login", catchAsync(UserController.login));
router.put("/logout", isLoggedIn, catchAsync(UserController.logout));

export default router;