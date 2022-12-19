import { createReadStream } from "node:fs";
import { join } from "node:path";
import showCurrentDirectoryMessage from "../../helpers/showCurrentDirectoryMessage.js";

export default async function readAndWriteFile(pathString) {
  let data = "";
  try {
    const pathToFile = join(pathString);
    const rs = createReadStream(pathToFile, { encoding: "utf8" });
    rs.on("data", (chunk) => {
      data += chunk;
    })
      .on("end", () => {
        console.log(data);
        showCurrentDirectoryMessage();
      })
      .on("error", () => {
        console.log(
          `Operation failed! Can't found or read a file with such path or name ${pathString}`
        );
        showCurrentDirectoryMessage();
      });
  } catch (err) {
    console.log("Operation failed");
    showCurrentDirectoryMessage();
  }
}
