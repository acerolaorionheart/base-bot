import { ButtonBuilder, createCommand } from "../structures"

export default createCommand({
  name: "button",
  description: "send a message with a button",
  run: async(ctx) => {
    const button = new ButtonBuilder()
    .setStyle("gray")
    .setLabel("hello world!")
    .setEmoji("👋")
    .setCustomId("button");
    ctx.reply(button.build("a button :0"));
  },
  createComponentInteraction: async(i, args) => {
    i.createMessage({ content: "halo world!" });
  }
})