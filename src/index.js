import { argv } from "node:process";

const args = argv.slice(2);
const argName = String(args).split("=")[1];
const userName = argName !== "your_username" ? argName : "Anonymous";
console.log(`Welcome to the File Manager, ${userName}!`);
