import { argv, cwd, chdir, stdin, stdout, exit } from "node:process";
import { homedir } from "node:os";
import * as readline from "readline/promises";
import showCurrentDirectoryMessage from "./helpers/showCurrentDirectoryMessage.js";
import changeDirectory from "./commands/cd.js";
import goUpFromCurrentDirectory from "./commands/up.js";
import printListInformation from "./commands/list.js";
import readAndWriteFile from "./commands/cat.js";

chdir(homedir());

const args = argv.slice(2);
const argName = String(args).split("=")[1];
const userName = argName !== "your_username" ? argName : "Anonymous";

const rl = readline.createInterface({ input: stdin, output: stdout });

const startWorkingDirectory = homedir();

console.info(`Starting working directory ${startWorkingDirectory}`);
console.info(`Welcome to the File Manager, ${userName}!`);

showCurrentDirectoryMessage();

rl.on("line", async (data) => {
  if (data === "up") {
    goUpFromCurrentDirectory();
    return;
  }
  if (data === ".exit") {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    setTimeout(() => exit(), 0);
    return;
  }
  if (data.slice(0, 2) === "cd") {
    changeDirectory(data.slice(3));
    return;
  }
  if (data === "ls") {
    printListInformation();
    return;
  }
  if (data.slice(0, 3) === "cat") {
    readAndWriteFile(data.slice(4));
    return;
  } else {
    console.error("Invalid input");
  }
})
  .on("SIGINT", () => rl.close())
  .on("close", () =>
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
  )
  .on("error", () => console.error("Invalid input"));
