import { ApplicationCommandOptions, ComponentInteraction, GuildComponentSelectMenuInteraction, ModalSubmitInteraction } from "oceanic.js"
import { App } from ".."
import CommandContext from "./CommandContext"

export type Command = {
  name: string;
  description: string;
  ephemeral?: boolean
  isThinking?: boolean
  options?: ApplicationCommandOptions[]
  run: (context: CommandContext, client?: App) => Promise<void>;
  createComponentInteraction?: (i: ComponentInteraction, args: string[], client?: App) => Promise<void>;
  createModalSubmitInteraction?: (i: ModalSubmitInteraction, args: string[], client?: App) => Promise<any>;
}
export default function(
  command: Command
): Command {
  return command;
}