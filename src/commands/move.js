import copyFile from "./cp.js";
import { rm } from "node:fs/promises";

const moveFile = async (fileMovePath, pathDirectoryToMove) => {
  try {
    await copyFile(fileMovePath, pathDirectoryToMove);
    await rm(fileMovePath);
  } catch (err) {
    return;
  }
};

export default moveFile;
