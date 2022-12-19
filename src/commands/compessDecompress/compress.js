import { createWriteStream, createReadStream, F_OK } from "node:fs";
import * as zlib from "node:zlib";
import { access } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import showCurrentDirectoryMessage from "../../helpers/showCurrentDirectoryMessage.js";

const compressFile = async (pathToFile, pathToFileCompressed) => {
  const isFileExists = await access(pathToFile, F_OK)
    .then(() => {
      return true;
    })
    .catch(() => {
      console.log("The file being compressed does not exist.");
      return false;
    });
  const isZipExists = await access(pathToFileCompressed, F_OK)
    .then(() => {
      console.log("The file has already been compressed in this directory.");
      return true;
    })
    .catch(() => {
      return false;
    });

  try {
    if (isFileExists) {
      if (!isZipExists) {
        const rs = createReadStream(pathToFile, "utf-8");
        const ws = createWriteStream(pathToFileCompressed);
        const brotliZip = zlib.createBrotliCompress({
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]:
              zlib.constants.BROTLI_MIN_QUALITY,
          },
        });
        await pipeline(rs, brotliZip, ws);
        console.log("File has been compressed!");
      }
    }
  } catch {
    console.log("Operation failed");
  } finally {
    showCurrentDirectoryMessage();
  }
};

export default compressFile;
