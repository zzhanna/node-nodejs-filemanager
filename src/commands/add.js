import { writeFile } from "node:fs/promises";
import { cwd } from "node:process";
import { join } from "node:path";
import showCurrentDirectoryMessage from "../helpers/showCurrentDirectoryMessage.js";

const addNewFile = async (nameFile) => {
  const pathToFile = join(cwd(), nameFile);
  console.log(`"${pathToFile}"`);
  try {
    await writeFile(pathToFile, "", { flag: "wx" });
    console.log("File created!");
  } catch {
    console.log("Attention! Such a file already exists in this directory");
  } finally {
    showCurrentDirectoryMessage();
  }
};

export default addNewFile;
