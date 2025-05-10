import { Request, Response, Router } from "express";
import ValidateJwt from "../../middleware/ValidateToken";
import upload from "../../config/multerConfig";
import AccountController from "./account.controller";


const router = Router();

const accountController: AccountController = new AccountController();

router.get("/api/account/:id", (req: Request, res: Response) => {
    accountController.getAccountById(req, res);
});



export default router;