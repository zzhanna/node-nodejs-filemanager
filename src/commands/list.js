import { cwd } from "node:process";
import { readdir } from "node:fs/promises";
import showCurrentDirectoryMessage from "../helpers/showCurrentDirectoryMessage.js";

export default async function printListInformation() {
  try {
    const listFile = await readdir(cwd());
    console.table(listFile);
    showCurrentDirectoryMessage();
  } catch {
    console.log("Operation failed");
  }
}
