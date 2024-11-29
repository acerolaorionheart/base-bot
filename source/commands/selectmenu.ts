import { AnyComponentSelectMenuInteraction, ComponentInteraction, ComponentTypes, GuildComponentSelectMenuInteraction, MessageComponentSelectMenuInteractionData } from "oceanic.js"
import { createCommand, SelectMenuBuilder } from "../structures"

export default createCommand({
  name: "selectmenu",
  description: "send a message with a select menu",
  run: async(ctx) => {
    const menu = new SelectMenuBuilder()
    .setPlaceholder("Select something!")
    .setOptions(
      {
        label: "hello",
        value: "hello",
        description: "hello",
        emoji: {
          name: "👋"
        }
      },
      {
        label: "world",
        value: "world",
        description: "world",
        emoji: {
          name: "🌎"
        }
      }
    )
    .setCustomId("selectmenu");
    ctx.reply(menu.build("a select menu :0"));
  },
  createComponentInteraction: async(i, args, client) => {
    if(i.isSelectMenuComponentInteraction()) {
      const values = (i.data as MessageComponentSelectMenuInteractionData).values.raw;
      if(values[0] === "hello") {
        i.createMessage({ content: "world!" });
      }
      else if(values[0] === "world") {
        i.createMessage({ content: "hello!" });
      }
    }
  }
})