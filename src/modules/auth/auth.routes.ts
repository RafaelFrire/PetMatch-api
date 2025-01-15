import { Request, Response, Router } from "express";
import AuthController from "./auth.controller";


const router = Router();

const authController:AuthController = new AuthController();


router.post("/api/auth/signin", (req: Request, res: Response) => {
    authController.signIn(req, res);
});

router.post("/api/auth/signup", (req: Request, res: Response) => {
    authController.signUp(req, res);
});


export default router;