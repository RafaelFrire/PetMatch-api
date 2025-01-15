import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { auth } from "../config/auth";


const ValidateJwt = (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers['x-access-token'];
    const token = typeof tokenHeader === 'string' ? tokenHeader : (Array.isArray(tokenHeader) ? tokenHeader[0] : undefined);

    if (token && auth.secret) {
        try {
          // Verifica o token usando a chave secreta
          const decoded = jwt.verify(token, auth.secret); // authConfig.secret é a chave secreta usada para assinar o JWT
          if (decoded) {
            next(); // Token válido, continua para o próximo middleware ou handler
          } else {
            res.status(401).json({ message: "Token inválido" });
          }
        } catch (err) {
            // Erro na verificação do token
            console.error('Erro ao verificar o token:', err);
            res.status(401).json({ message: 'Token inválido' });
        }
    } else {
        res.status(401).json({ message: 'Token não fornecido' });
    }
};

export default ValidateJwt;