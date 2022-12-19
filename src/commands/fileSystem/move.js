import copyFile from "./cp.js";
import { access, rm } from "node:fs/promises";
import { F_OK } from "node:fs";
import { join } from "node:path";

const moveFile = async (fileMovePath, pathDirectoryToMove) => {
  try {
    const nameFile = fileMovePath.replace(/^.*[\\\/]/, "").replaceAll(`"`, "");
    const pathDirectoryToCopyFile = pathDirectoryToMove.replaceAll(`"`, "");
    const pathToDirectory = join(pathDirectoryToCopyFile, nameFile);
    const isFileExistInCopyDirectory = await access(pathToDirectory, F_OK)
      .then(() => {
        return true;
      })
      .catch(() => false);
    await copyFile(fileMovePath, pathDirectoryToMove);
    if (!isFileExistInCopyDirectory) {
      await rm(fileMovePath);
      console.log("File has been removed");
    }
  } catch {
    return;
  }
};

export default moveFile;
