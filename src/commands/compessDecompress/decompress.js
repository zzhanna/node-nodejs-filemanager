import { createWriteStream, createReadStream, F_OK } from "node:fs";
import * as zlib from "node:zlib";
import { access } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import showCurrentDirectoryMessage from "../../helpers/showCurrentDirectoryMessage.js";

const decompressFile = async (pathToFileZip, pathToFileDecompressed) => {
  const isFileExists = await access(pathToFileZip, F_OK)
    .then(() => {
      return true;
    })
    .catch(() => {
      console.log("The file being decompressed does not exist.");
      return false;
    });
  const isZipExists = await access(pathToFileDecompressed, F_OK)
    .then(() => {
      console.log("The file has already been decompressed in this directory.");
      return true;
    })
    .catch(() => {
      return false;
    });

  try {
    if (isFileExists) {
      if (!isZipExists) {
        const rs = createReadStream(pathToFileZip);
        const ws = createWriteStream(pathToFileDecompressed);
        const brotliZip = zlib.createBrotliDecompress();
        await pipeline(rs, brotliZip, ws);
        console.log("File has been decompressed!");
      }
    }
  } catch {
    console.log("Operation failed");
  } finally {
    showCurrentDirectoryMessage();
  }
};

export default decompressFile;
