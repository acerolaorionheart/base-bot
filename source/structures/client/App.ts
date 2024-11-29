import { Client, ClientOptions } from "oceanic.js"
import { Logger } from ".."
import { readdirSync } from "fs"
import path from "path"
import { Command } from "../command/createCommand"

export default class App extends Client {
  public commands: Map<string, Command> = new Map();
  public constructor(options: ClientOptions) {
    super(options);
  }
  public async start() {
    await this.connect();
    for(const file of readdirSync(path.join(__dirname, "../../listeners"))) {
      const listener = (await import(`../../listeners/${file}`)).default.default ;
      if(listener.name === "ready") this.once("ready", () => listener.run(this).catch((e: Error) => new Logger(this).error(e)));
      else this.on(listener.name, (...args) => listener.run(this, ...args).catch((e: Error) => new Logger(this).error(e)));
    }
    for(const file of readdirSync(path.join(__dirname, "../../commands"))) {
      const command = (await import(`../../commands/${file}`)).default.default ?? (await import(`../../commands/${file}`)).default.default;
      this.commands.set(command.name, command);
    }
  }
}