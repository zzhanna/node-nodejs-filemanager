import { createHash } from "node:crypto";
import { readFile, access } from "node:fs/promises";
import { F_OK } from "node:fs";

const calculateHash = async (filePath) => {
  try {
    const isFileToHashExists = await access(filePath, F_OK)
      .then(() => {
        return true;
      })
      .catch(() => {
        console.log("The file being hashed does not exist.");
        return false;
      });
    if (isFileToHashExists) {
      const fileText = await readFile(filePath);
      const hash = createHash("sha256").update(fileText).digest("hex");
      console.log(`File hash= ${hash}`);
    }
  } catch (err) {
    console.error("Operation failed");
  }
};

export default calculateHash;
