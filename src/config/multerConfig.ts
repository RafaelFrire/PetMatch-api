import multer from "multer";
import { Request } from "express";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const destinationPath = "uploads/";
    cb(null, destinationPath);
  },
  filename(req, file, cb) {
    const time = Date.now();
    return cb(null, `${time}_${file.originalname}`);
  },
});

const limits = { fieldSize: 10 * 1024 * 1024 };

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo não suportado"), false);
  }
};

// utilizar "files" para como chave, para realizar o upload.
const upload = multer({
  storage,
  limits,
  fileFilter,
}).array("files");

export default upload;
