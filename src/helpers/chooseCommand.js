import changeDirectory from "../commands/fileSystem/cd.js";
import goUpFromCurrentDirectory from "../commands/fileSystem/up.js";
import printListInformation from "../commands/fileSystem/list.js";
import readAndWriteFile from "../commands/fileSystem/cat.js";
import addNewFile from "../commands/fileSystem/add.js";
import renameFile from "../commands/fileSystem/rn.js";
import getInformationFromUserInArray from "./getInformationFromUserInArray.js";
import copyFile from "../commands/fileSystem/cp.js";
import moveFile from "../commands/fileSystem/move.js";
import showCurrentDirectoryMessage from "./showCurrentDirectoryMessage.js";
import deleteFile from "../commands/fileSystem/rm.js";
import osInform from "../commands/os/os.js";
import calculateHash from "../commands/hash/hash.js";
import compressFile from "../commands/compessDecompress/compress.js";
import decompressFile from "../commands/compessDecompress/decompress.js";

const chooseCommand = (data, userName) => {
  const command = data.slice(0, data.indexOf(" "));
  const commandLength = command.length;
  const informationFromUserAfterCommand = data.slice(commandLength + 1);
  try {
    if (data.slice(0, 2) === "up") {
      goUpFromCurrentDirectory();
      return;
    }
    if (data.slice(0, 5) === ".exit") {
      console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
      process.exit();
    }
    if (command === "cd") {
      changeDirectory(informationFromUserAfterCommand.replaceAll(`"`, ""));
      return;
    }
    if (data.slice(0, 2) === "ls") {
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
    }
    if (command === "os") {
      const commandOs = informationFromUserAfterCommand.replaceAll("--", "");
      osInform(commandOs);
      return;
    }
    if (command === "hash") {
      const pathFileToHash = informationFromUserAfterCommand;
      calculateHash(pathFileToHash.replaceAll(`"`, ""));
      return;
    }
    if (command === "compress") {
      const arrayPathFileToCompress = getInformationFromUserInArray(
        command,
        informationFromUserAfterCommand
      );
      const pathToFile = arrayPathFileToCompress[0].replaceAll(`"`, "");
      const pathToFileCompressed = arrayPathFileToCompress[1].replaceAll(
        `"`,
        ""
      );
      compressFile(pathToFile, pathToFileCompressed);
      return;
    }
    if (command === "decompress") {
      const arrayPathFileToDeCompress = getInformationFromUserInArray(
        command,
        informationFromUserAfterCommand
      );
      const pathToCompressedFile = arrayPathFileToDeCompress[0].replaceAll(
        `"`,
        ""
      );
      const pathToFileDecompress = arrayPathFileToDeCompress[1].replaceAll(
        `"`,
        ""
      );
      decompressFile(pathToCompressedFile, pathToFileDecompress);
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
