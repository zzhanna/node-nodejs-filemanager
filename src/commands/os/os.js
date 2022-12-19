import { cpus, EOL, userInfo } from "node:os";
import { arch } from "node:process";

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
      console.log(osInform[command]);
    } else {
      throw Error;
    }
  } catch {
    console.log("Operation failed!");
  }
};

export default osInform;
