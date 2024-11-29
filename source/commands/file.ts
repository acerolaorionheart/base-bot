import { createCommand } from "../structures"

export default createCommand({
  name: "file",
  description: "send a message with a file",
  isThinking: true,
  run: async(ctx) => {
    const response = await fetch("https://imgur.com/7zHbzxq.png");
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    ctx.reply("", {
      files: [
        {
          name: "tokisaki_kurumi.png",
          contents: buffer
        }
      ]
    });
  }
})