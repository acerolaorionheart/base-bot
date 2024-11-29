import { createCommand } from "../structures"

export default createCommand({
  name: "ping",
  description: "shows the client ping",
  run: async(ctx) =>  {
    ctx.reply("commands.ping.response", { ping: ctx.guild.shard.latency });
  }
});