const Discord = require("discord.js");
const client = new Discord.Client({ ws: { intents: Discord.Intents.ALL } });
const blacklist = require("./blacklist.json").ids;
console.log(blacklist);
const prefix = "/";
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("guildMemberAdd", (member) => {
  blacklist.forEach(id => {
    if (id === member.id) {
      member.ban({
        days: 0,
        reason: "Blacklisted on BOT"
      });
    }
  });
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  console.log("F")
  if (command === "ban-blacklist") {
    blacklist.forEach(id => {
      console.log(id);
      let idBlacklisted = message.guild.members.resolve(id);
      idBlacklisted.ban({
        days: 0,
        reason: "Blacklisted on BOT"
      });
    });
  };
});

client.login("BOT_TOKEN");
