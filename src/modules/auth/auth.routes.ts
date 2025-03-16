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
    const files = req.files as Express.Multer.File[]; // Garantimos que é um array
    const filename = files.length > 0 ? files[0].filename : "";

    authController.signUp(req, res, filename);
});

router.post("/api/auth/signup_ong", upload, (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[]; // Garantimos que é um array
    const filePath = files.length > 0 ? files[0].path : "";

    authController.signUpOng(req, res);
});


export default router;