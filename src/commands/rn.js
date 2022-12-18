import { cwd } from "node:process";
import { rename } from "node:fs/promises";
import { join } from "node:path";
import showCurrentDirectoryMessage from "../helpers/showCurrentDirectoryMessage.js";

const renameFile = async (pathToFile, newFile) => {
  showCurrentDirectoryMessage();
  try {
    const pathToOldFile = join(pathToFile.replaceAll(`"`, ""));
    const pathToRenameFile = join(cwd(), newFile.replaceAll(`"`, ""));
    await rename(pathToOldFile, pathToRenameFile);
    console.log(`The file has been renamed as ${newFile}`);
  } catch {
    console.log("Renaming is not possible! Check the path or file name!");
  }
};
export default renameFile;
