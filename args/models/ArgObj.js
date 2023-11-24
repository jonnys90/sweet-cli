export default class ArgObj {
  constructor(cmd, aliases, argsMode) {
    this.cmd = cmd;
    this.aliases = aliases;
    this.argsMode = argsMode;
  }
}
