import { CreateApplicationCommandOptions } from "oceanic.js"
import { createListener, Logger } from "../structures"

export default createListener({
  name: "ready",
  run: async(client) => {
    Logger.send(`${client.user.username} connected`);
    const commands: CreateApplicationCommandOptions[] = [];
    client.commands.forEach(cmd => {
      commands.push({
        name: cmd.name,
        description: cmd.description,
        options: cmd.options,
        type: 1
      });
    });
    client.application.bulkEditGlobalCommands(commands);
  }
});