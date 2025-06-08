import { Request, response, Response } from "express";
import { ErrorResponse } from "../../exceptions/errorResponse";
import { ErrorMessage, ErrorMessageUser } from "../../constants/errorMessage";
import AuthRepository from "./authRepository";
import { decrypt, encode } from "../../config/bcrypt";
import { CreateUserInput, User } from "../../interfaces/User";
import ErrorCode from "../../constants/errorCode";
import { SuccessMessage } from "../../constants/sucessMessge";
import { SuccessCode } from "../../constants/sucessCode";
import { auth } from "../../config/auth";
import jwt from "jsonwebtoken";
import StatusEnum from "../../enums/StatusEnum";
import ExtractType from "../../utils/extractType";
import RoleEnum from "../../enums/RoleEnum";

class AuthController {
  authRepository: AuthRepository = new AuthRepository();

  async signIn(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const findUser = await this.authRepository.findByEmail(email);

      console.log("auth", req.body);

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
        String(auth.secret), // Chave secreta
        { expiresIn: String(auth.expires) } // Tempo de expiração do token
      );

      return res.status(SuccessCode.SUCCESS).json({
        message: SuccessMessage.LOGIN_SUCCESS,
        user: {
          id: findUser.id,
          name: findUser.name,
          lastname: findUser.lastname,
          email: findUser.email,
          role: findUser.role,
          status: findUser.status,
        },
        token,
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
  async signUp(req: Request, res: Response, filename?: string) {
    try {
      const data: CreateUserInput = req.body as CreateUserInput;
      const adopterData: AdotperDto = req.body as AdotperDto;
      const findUser = await this.authRepository.findByEmail(data.email);

      if (!data || !adopterData) {
        throw new ErrorResponse(
          ErrorMessage.BAD_REQUEST,
          ErrorCode.BAD_REQUEST
        );
      }

      const filteredData = ExtractType(req.body, [
        "id",
        "email",
        "name",
        "lastname",
        "password",
        "status",
        "documentPath",
        "createdAt",
        "updatedAt",
      ]);

      if (findUser !== null) {
        throw new ErrorResponse(
          ErrorMessageUser.ALREADY_EXISTS,
          ErrorCode.ALREADY_EXISTS
        );
      } else {
        const encondePassword = await encode(filteredData.password);

        if (typeof encondePassword === "string") {
          const createUser = await this.authRepository.createAdopter(
            {
              ...filteredData,
              password: encondePassword,
              status: StatusEnum.ACTIVE,
              role: RoleEnum.ADOPTER,
              documentPath: filename || "",
              password_reset_token: null,
              password_reset_experies: null,
            },
            adopterData
          );

          return res.status(SuccessCode.CREATED).json({
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
  // Utility function to generate a slug from a string
  private generateSlug(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  async signUpOng(req: Request, res: Response, filename?: string) {
    try {
      const data: CreateUserInput = req.body;
      const ongData: OngDto = req.body as OngDto;
      const findUser = await this.authRepository.findByEmail(data.email);


      // Generate a default slug for the ONG using name, lastname, and city
      const slug = this.generateSlug(
        `${ongData.name}-${data.lastname}-${ongData.city}-${ongData.state}`
      );

      const filteredData = ExtractType(req.body, [
        "id",
        "email",
        "name",
        "lastname",
        "password",
        "status",
        "documentPath",
        "createdAt",
        "updatedAt",
      ]);

      if (findUser !== null) {
        throw new ErrorResponse(
          ErrorMessageUser.ALREADY_EXISTS,
          ErrorCode.ALREADY_EXISTS
        );
      } else {
        const encondePassword = await encode(filteredData.password);

        if (typeof encondePassword === "string") {
          const createUser = await this.authRepository.createOng(
            {
              ...filteredData,
              password: encondePassword,
              status: StatusEnum.PENDING,
              role: RoleEnum.ONG,
              documentPath: filename || "",
              password_reset_token: null,
              password_reset_experies: null,
            },
            { ...ongData, cnpj: data?.document, slug }
          );

          return res.status(SuccessCode.CREATED).json({
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
