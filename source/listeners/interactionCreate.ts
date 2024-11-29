import { createListener, Logger } from "../structures"
import CommandRunnner from "../structures/command/CommandRunner"

export default createListener({
  name: "interactionCreate",
  run: async(client, i) => {
    if(i.isCommandInteraction()) {
      new CommandRunnner().run(client, i).catch(e => new Logger(client).error(e));
    }
    if(i.isComponentInteraction()) {
      const args = i.data.customID.split(";");
      const command = client.commands.get(args[0]);
      if(!command) return;
      if(!command.createComponentInteraction) return;
      command.createComponentInteraction(i, args, client).catch(e => new Logger(client).error(e));
    }
  }
});