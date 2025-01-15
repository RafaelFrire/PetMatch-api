import { Request, Response } from "express";
import { ErrorResponse } from "../../exceptions/errorResponse";
import { ErrorMessage, ErrorMessageUser } from "../../constants/errorMessage";
import AuthRepository from "../../repository/authRepository";
import { decrypt } from "../../config/bcrypt";
import { User } from "../../interfaces/User";

class AuthController {
  authRepository: AuthRepository = new AuthRepository();

  async signIn(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const findUser = await this.authRepository.findByEmail(email);
    
      if (!findUser) {
        throw new ErrorResponse(ErrorMessageUser.NOT_FOUND, 404);
      }

      const validatePassword = await decrypt(password, findUser.password);

      if(!validatePassword){
        throw new ErrorResponse(ErrorMessage.UNAUTHORIZED, 401);

      } 

      console.log("retuurn", validatePassword)

      return res.status(200).json({
        message: "Usuário encontrado",
        user: findUser,
      });
    } catch (err) {
      if (err instanceof ErrorResponse) {
        return err.sendResponse(res);
      }
      return res
        .status(500)
        .json({ errorMessage: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }
  async signUp(req: Request, res: Response) {
    try{
        const data:User = req.body;

    }
    catch (err){

    }
} 
}

export default AuthController;