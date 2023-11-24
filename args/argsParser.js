import argsOptions from "./enums/argsOptions.js";
import ArgObj from "./models/ArgObj.js";
/*
    npm i packages -D -g
    cmd arg
    cmd args -flag --flags
    {
        cmd:string
        aliases:string of all aliases cmds
        argsMode: oneArg/noArgs(default)/marge(margeToOneLineUntilNextCmd)
    }
*/
const argsParser = (cmds) => {
  let argsLen = process.argv.length;
  let cmdObj = {};
  let corCmd, fnd;
  cmds = convertCmds(cmds);
  for (let i = 2; i < argsLen; i++) {
    let arg = process.argv[i];
    let reg = new RegExp(`${arg} `);
    fnd = false;
    for (let cmd of cmds) {
      if (reg.test(cmd.aliases)) {
        corCmd = cmd;
        fnd = true;
        break;
      }
    }
    if (fnd) cmdObj[corCmd.cmd] = "";
    else {
      if (!corCmd) continue;
      switch (corCmd.argsMode) {
        case argsOptions.MARGE:
          cmdObj[corCmd.cmd] += arg + " ";
          break;
        case argsOptions.ONEARG:
          cmdObj[corCmd.cmd] = arg;
          break;
      }
    }
  }
  for (let [k] in cmdObj) {
    cmdObj[k] = cmdObj[k].trim();
    cmdObj[k] = { str: cmdObj[k], arr: cmdObj[k].split(" ") };
  }
  return cmdObj;
};
const convertCmds = (cmds) => {
  for (let cmd of cmds) {
    cmd.aliases = cmd.cmd + " " + (cmd.aliases ? cmd.aliases + " " : "");
  }
  return cmds;
};
export default argsParser;
export { argsOptions, ArgObj };
