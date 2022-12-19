import changeDirectory from "../commands/cd.js";
import goUpFromCurrentDirectory from "../commands/up.js";
import printListInformation from "../commands/list.js";
import readAndWriteFile from "../commands/cat.js";
import addNewFile from "../commands/add.js";
import renameFile from "../commands/rn.js";
import getInformationFromUserInArray from "./getInformationFromUserInArray.js";
import copyFile from "../commands/cp.js";
import moveFile from "../commands/move.js";
import showCurrentDirectoryMessage from "./showCurrentDirectoryMessage.js";
import deleteFile from "../commands/rm.js";

const chooseCommand = (data, userName) => {
  try {
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
      const pathAndFileArray = getInformationFromUserInArray(
        command,
        informationFromUserAfterCommand
      );
      const oldFile = pathAndFileArray[0];
      const newFile = pathAndFileArray[1];
      renameFile(oldFile, newFile);
      return;
    }
    if (command === "cp") {
      const arrayPathFileToCopyAndPathFolder = getInformationFromUserInArray(
        command,
        informationFromUserAfterCommand
      );
      const pathFileToCopy = arrayPathFileToCopyAndPathFolder[0];
      const pathDirectoryToCopy = arrayPathFileToCopyAndPathFolder[1];
      copyFile(pathFileToCopy, pathDirectoryToCopy);
      return;
    }
    if (command === "mv") {
      const arrayPathFileToMoveFile = getInformationFromUserInArray(
        command,
        informationFromUserAfterCommand
      );
      const pathFileToMove = arrayPathFileToMoveFile[0];
      const pathDirectoryToMove = arrayPathFileToMoveFile[1];
      moveFile(pathFileToMove, pathDirectoryToMove);
      return;
    }
    if (command === "rm") {
      const deletePathFile = informationFromUserAfterCommand;
      deleteFile(deletePathFile);
      return;
    } else {
      console.error("Invalid input");
      showCurrentDirectoryMessage();
    }
  } catch (err) {
    return;
  }
};

export default chooseCommand;
