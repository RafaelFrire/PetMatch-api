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
    const filePath = req.files || [];
    const files = req.files as Express.Multer.File[]; // Garantimos que é um array

    authController.signUp(req, res);
});


router.post("/api/auth/signup_ong", upload, (req: Request, res: Response) => {
    const filePath = req.files || [];
    const files = req.files as Express.Multer.File[]; // Garantimos que é um array

    authController.signUpOng(req, res);
});


export default router;