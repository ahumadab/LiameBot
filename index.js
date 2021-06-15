const Discord = require('discord.js')
const bot = new Discord.Client()
const fs = require("fs");
const axios = require("axios");
require('dotenv').config()


bot.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

const prefix = "!";
const idASMinotoR = "UCB8il9i9Bl9mxEaCaClFEXQ"; // Id public de ce gros shlag
const googleApiKey = process.env.GOGOLE_API_KEY; // Need to be updated



bot.on('ready', () => {
	console.log(`RotchBot Logged in as ${bot.user.tag}!`);
});




bot.on('message', (message)=> {


	if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(" "); // Au cas où on veut ajouter des arguments pour une commande
  const command = args.shift().toLowerCase();
  if (!bot.commands.has(command)) return;
	try {
		bot.commands.get(command).execute(message, args, bot);
	} catch (error) {
	console.error(error);
	message.reply("Une erreur s'est produite pendant l'execution de la commande.");
	}
})

bot.login(process.env.ROTCHBOT_TOKEN);