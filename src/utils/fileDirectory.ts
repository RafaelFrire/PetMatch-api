import path from 'path'
import fs from 'fs'

function ensureUploadsDirectoryExists() {
    const LOCAL_FILES_PATH = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "tmp/uploads"
    );
    console.log("Diretório de uploads:", LOCAL_FILES_PATH);

    if (!fs.existsSync(LOCAL_FILES_PATH)) {
      console.log("Criando diretório:", LOCAL_FILES_PATH);
      fs.mkdirSync(LOCAL_FILES_PATH, { recursive: true });
    } else {
      console.log("Diretório já existe:", LOCAL_FILES_PATH);
    }
  }

  export default ensureUploadsDirectoryExists;