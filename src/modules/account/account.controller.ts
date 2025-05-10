import { Request, Response } from "express";
import AccountService from "./account.service";

class AccountController {
  accountService: AccountService = new AccountService();

  async getAccountById(req: Request, res: Response) {
    try {
      const account = this.accountService.getAccountById(req, res);
      return account;
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
export default AccountController;
