import { Request, Response, Router } from "express";
import AuthController from "./auth.controller";
import ValidateJwt from "../../middleware/ValidateToken";
import upload from "../../config/multerConfig";


const router = Router();

const authController:AuthController = new AuthController();


router.post("/api/auth/signin", (req: Request, res: Response) => {
    authController.signIn(req, res);
});

router.post("/api/auth/signup", upload, (req: Request, res: Response) => {
    authController.signUp(req, res);
});


export default router;