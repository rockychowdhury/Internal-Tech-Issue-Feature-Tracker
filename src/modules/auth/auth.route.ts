import { Router } from "express";
import { authController } from "./auth.controller";
import { validateSignup, validateLogin } from "../../middleware/validate";


const router = Router();


router.post("/signup", validateSignup, authController.registerUser);
router.post("/login", validateLogin, authController.loginUser);




export const authRoute = router;
