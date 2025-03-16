import { Router, Request, Response } from "express";
import ValidateJwt from "../../middleware/ValidateToken";
const path = require("path");
const fs = require("fs");

const router = Router();

const destinationPath = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "tmp",
  "uploads"
);

router.get("/api/search/:filePath", ValidateJwt, (req, res) => {
  const { filePath } = req.params;

  const fileLocation = path.join(destinationPath, filePath);

  console.log(`Procurando o arquivo em: ${fileLocation}`);

  fs.access(fileLocation, fs.constants.F_OK, (err: any) => {
    if (!fs.existsSync(destinationPath)) {
      return res
        .status(404)
        .json({ message: "Diretório de uploads não encontrado" });
    }

    if (err) {
      console.error("Arquivo não encontrado:", err);
      return res.status(404).json({ message: "Arquivo não encontrado" });
    }

    // Se o arquivo existir, retorna o arquivo
    res.sendFile(fileLocation, (err) => {
      if (err) {
        console.error("Erro ao enviar o arquivo:", err);
        return res.status(500).json({ message: "Erro ao enviar o arquivo" });
      }
    });
  });
});

export default router;
