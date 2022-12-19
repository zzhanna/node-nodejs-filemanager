import { cpus, EOL, userInfo } from "node:os";
import { arch } from "node:process";
import showCurrentDirectoryMessage from "../../helpers/showCurrentDirectoryMessage.js";

const osInform = (command) => {
  try {
    const cpusInfo = cpus().map(({ model, speed }) => {
      speed = `${speed / 1000} GHz`;
      return { model, speed };
    });
    const { username, homedir } = userInfo();
    const osInform = {
      EOL: JSON.stringify(EOL),
      cpus: cpusInfo,
      homedir: homedir,
      username: username,
      architecture: arch,
    };
    if (osInform[command]) {
      command === "cpus"
        ? console.table(osInform[command])
        : console.log(osInform[command]);
    } else {
      throw Error;
    }
  } catch {
    console.log("Operation failed!");
  } finally {
    showCurrentDirectoryMessage();
  }
};

export default osInform;
