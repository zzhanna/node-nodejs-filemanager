import changeDirectory from "../commands/cd.js";
import goUpFromCurrentDirectory from "../commands/up.js";
import printListInformation from "../commands/list.js";
import readAndWriteFile from "../commands/cat.js";
import addNewFile from "../commands/add.js";
import renameFile from "../commands/rn.js";
import showCurrentDirectoryMessage from "./showCurrentDirectoryMessage.js";

const chooseCommand = (data, userName) => {
  const command = data.slice(0, data.indexOf(" "));
  const commandLength = command.length;
  const informationFromUserAfterCommand = data.slice(commandLength + 1);
  if (command === "up") {
    goUpFromCurrentDirectory();
    return;
  }
  if (command === ".exit") {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    setTimeout(() => exit(), 0);
    return;
  }
  if (command === "cd") {
    changeDirectory(informationFromUserAfterCommand.replaceAll(`"`, ""));
    return;
  }
  if (command === "ls") {
    printListInformation(informationFromUserAfterCommand.replaceAll(`"`, ""));
    return;
  }
  if (command === "cat") {
    readAndWriteFile(informationFromUserAfterCommand.replaceAll(`"`, ""));
    return;
  }
  if (command === "add") {
    addNewFile(informationFromUserAfterCommand.replaceAll(`"`, ""));
    return;
  }
  if (command === "rn") {
    let pathAndFileArray = "";
    if (informationFromUserAfterCommand.includes(`"`)) {
      if (data[commandLength + 1] === `"`) {
        pathAndFileArray = informationFromUserAfterCommand.split(`" `);
      } else {
        pathAndFileArray = informationFromUserAfterCommand.split(` "`);
      }
    } else {
      pathAndFileArray = informationFromUserAfterCommand.split(" ");
    }
    const oldFile = pathAndFileArray[0];
    const newFile = pathAndFileArray[1];
    renameFile(oldFile, newFile);
    return;
  }
  if (command === "cp") {
    copyFile(data.slice(commandLength + 1));
    return;
  } else {
    console.error("Invalid input");
  }
};

export default chooseCommand;
