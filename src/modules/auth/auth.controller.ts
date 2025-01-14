import { Request, Response } from "express";
import { ErrorResponse } from "../../exceptions/errorResponse";
import { ErrorMessage, ErrorMessageUser } from "../../constants/errorMessage";
import AuthRepository from "../../repository/authRepository";
class AuthController{
    authRepository: AuthRepository = new AuthRepository();

    async signIn(req: Request, res:Response){
        try{
            const {email, password} = req.body;
            const findUser = await this.authRepository.findByEmail(email);

            if(!findUser) return res.status(404).json({
                ErrorMessage: ErrorMessageUser.NOT_FOUND
            })
            
        }
        catch (err){
            if(err instanceof ErrorResponse){
                return err.sendResponse(res);
            }
            res
              .status(500)
              .json({ errorMessage: ErrorMessage.INTERNAL_EXCEPTION });
        }
    }
    async signUp(req: Request, res:Response){

    }
}

export default AuthController;