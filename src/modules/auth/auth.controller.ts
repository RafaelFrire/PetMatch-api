import { Request, response, Response } from "express";
import { ErrorResponse } from "../../exceptions/errorResponse";
import { ErrorMessage, ErrorMessageUser } from "../../constants/errorMessage";
import AuthRepository from "../../repository/authRepository";
import { decrypt, encode } from "../../config/bcrypt";
import { CreateUserInput, User } from "../../interfaces/User";
import ErrorCode from "../../constants/errorCode";
import { SuccessMessage } from "../../constants/sucessMessge";
import { SuccessCode } from "../../constants/sucessCode";
import { auth } from "../../config/auth";
import jwt from "jsonwebtoken";
import StatusEnum from "../../enums/StatusEnum";
import ExtractType from "../../utils/extractType";

class AuthController {
  authRepository: AuthRepository = new AuthRepository();

  async signIn(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const findUser = await this.authRepository.findByEmail(email);

      console.log("auth", req.body)

      if (!findUser) {
        throw new ErrorResponse(
          ErrorMessageUser.NOT_FOUND,
          ErrorCode.NOT_FOUND
        );
      }

      const validatePassword = await decrypt(password, findUser.password);

      if (!validatePassword) {
        throw new ErrorResponse(
          ErrorMessage.UNAUTHORIZED,
          ErrorCode.UNAUTHORIZED
        );
      }

      const token = jwt.sign(
        { id: findUser.id, email: findUser.email }, // Payload do token
        auth.secret, // Chave secreta
        { expiresIn: auth.expires } // Tempo de expiração do token
      );

      return res.status(SuccessCode.LOGIN_SUCCESS).json({
        message: SuccessMessage.LOGIN_SUCCESS,
        user: {
          name: findUser.name,
          lastname: findUser.lastname,
          email: findUser.email,
          role: findUser.role,
          status: findUser.status
        },
        token
      });
    } catch (err) {
      if (err instanceof ErrorResponse) {
        return err.sendResponse(res);
      }
      console.error(err);
      return res
        .status(500)
        .json({ errorMessage: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }
  async signUp(req: Request, res: Response, filePath?: string) {
    try {
      const data: CreateUserInput = req.body;
      const findUser = await this.authRepository.findByEmail(data.email);

      const filteredData = ExtractType(req.body, ["id","email", "name", "lastname","password", "status", "documentPath", "createdAt","updatedAt"]);


      console.log("request: ", req.body);

      if (findUser !== null) {
        throw new ErrorResponse(
          ErrorMessageUser.ALREADY_EXISTS,
          ErrorCode.ALREADY_EXISTS
        );
      } else {
        const encondePassword = await encode(filteredData.password);

        if (typeof encondePassword === "string" && filePath) {
          const createUser = await this.authRepository.createUser({
            ...filteredData,
            password: encondePassword,
            status: StatusEnum.ACTIVE,
            role: "ADOPTER",
            password_reset_token: null,
            password_reset_experies: null
          });

          return res.status(SuccessCode.USER_CREATED).json({
            status: SuccessMessage.USER_CREATED,
            message: SuccessMessage.USER_CREATED,
            data: createUser,
          });
        } else {
          throw new ErrorResponse(
            ErrorMessage.BAD_REQUEST,
            ErrorCode.BAD_REQUEST
          );
        }
      }
    } catch (err) {
      if (err instanceof ErrorResponse) {
        return err.sendResponse(res);
      }
      console.error(err);
      return res
        .status(500)
        .json({ errorMessage: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }
}

export default AuthController;
