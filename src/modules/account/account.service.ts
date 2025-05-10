import { Request, Response } from "express";
import ErrorCode from "../../constants/errorCode";
import { ErrorMessage } from "../../constants/errorMessage";

import AccountRepository from "./account.Repository";

class AccountService {
  accountRepository: AccountRepository = new AccountRepository();

  async getAccountById(req: Request, res: Response) {
    const id = req.params.id;
    console.log("getAccountById called with id:", id);

    if (!id) {
      console.warn("Invalid id provided");
      return res.status(ErrorCode.BAD_REQUEST).json({ message: "Invalid id" });
    }

    try {
      const account = await this.accountRepository.findById(id);
      const formatedAccount = {
        ...account,
        password: undefined,
        password_reset_experies: undefined,
        password_reset_token: undefined,
      };


      if (!account) {
        console.warn("Account not found for id:", id);
        return res
          .status(ErrorCode.NOT_FOUND)
          .json({ message: "event not found" });
      }

      return res.status(200).json(formatedAccount);
    } catch (err) {
      console.error("Database error while fetching event by id:", err);
      return res
        .status(ErrorCode.INTERNAL_EXCEPTION)
        .json({ message: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }
}

export default AccountService;
