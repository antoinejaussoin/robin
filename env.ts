import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Envir = {
  TOKEN: string;
};

function findDotEnvPath(): string | null {
  let current = path.resolve(__dirname);
  for (let i = 0; i < 5; i++) {
    const custom = path.resolve(current, ".env");
    const example = path.resolve(current, ".env.example");
    if (fs.existsSync(custom)) {
      return custom;
    }
    if (fs.existsSync(example)) {
      return example;
    }
    current = path.resolve(current, "..");
  }
  return null;
}

const dotEnvPath = findDotEnvPath();
if (dotEnvPath) {
  dotenv.config({ path: dotEnvPath });
}

const values: Envir = {
  TOKEN: process.env["TOKEN"],
};

export default values;
