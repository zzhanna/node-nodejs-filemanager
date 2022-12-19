import { rename } from "node:fs/promises";
import { resolve } from "node:path";
import showCurrentDirectoryMessage from "../helpers/showCurrentDirectoryMessage.js";

const renameFile = async (oldFile, newFile) => {
  const pathToDirectory = oldFile.match(/^.*[\\\/]/)[0].replaceAll(`"`, "");
  if (!newFile) return;
  try {
    const pathToOldFile = resolve(oldFile.replaceAll(`"`, ""));
    const newFileNameRight = newFile.replaceAll(`"`, "");
    const pathToRenameFile = resolve(pathToDirectory, newFileNameRight);
    await rename(pathToOldFile, pathToRenameFile);
    console.log(`The file has been renamed as "${newFileNameRight}"`);
  } catch {
    console.log("Renaming is not possible! Check the path or file name!");
  }
  showCurrentDirectoryMessage();
};
export default renameFile;
