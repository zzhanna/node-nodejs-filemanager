import { chdir } from "node:process";
import showCurrentDirectoryMessage from "../../helpers/showCurrentDirectoryMessage.js";

export default function changeDirectory(path) {
  try {
    chdir(path);
    showCurrentDirectoryMessage();
  } catch (err) {
    console.log("Operation failed");
  }
}
