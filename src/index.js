import { argv, cwd, chdir, stdin, stdout, exit } from "node:process";
import { homedir } from "node:os";
import * as readline from "readline/promises";

chdir(homedir());

const args = argv.slice(2);
const argName = String(args).split("=")[1];
const userName = argName !== "your_username" ? argName : "Anonymous";

const rl = readline.createInterface({ input: stdin, output: stdout });

const startWorkingDirectory = homedir();
console.info(`Starting working directory ${startWorkingDirectory}`);

console.info(`Welcome to the File Manager, ${userName}!`);

console.info(`You are currently in ${startWorkingDirectory}`);

const goUpFromCurrentDirectory = () => {
  try {
    chdir("..");
    console.info(`You are currently in ${cwd()}`);
  } catch (err) {
    console.error("Operation failed");
  }
};

rl.on("line", async (data) => {
  if (data === "up") {
    goUpFromCurrentDirectory();
    return;
  }
  if (data === ".exit") {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    setTimeout(() => exit(), 0);
  } else {
    console.error("Invalid input");
  }
})
  .on("SIGINT", () => rl.close())
  .on("close", () =>
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
  )
  .on("error", () => console.error("Invalid input"));
