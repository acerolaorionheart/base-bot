import { CommandInteraction } from "oceanic.js"
import App from "../client/App"
import CommandContext from "./CommandContext"
import { Logger } from ".."

export default class CommandRunnner {
  public async run(
    client: App, interaction: CommandInteraction
  ) {
    const command = client.commands.get(interaction.data.name);
    if(!command) return;
    if(!interaction.guildID || !interaction.member) return;
    if(command.ephemeral) {
      await interaction.defer(64);
    }
    else if(command.isThinking) {
      await interaction.defer();
    }
    const ctx = new CommandContext({
      client,
      interaction,
      locale: "en",
      guild: interaction.guild!
    })
    command.run(ctx, client).catch(e => new Logger(client).error(e));
  }
}