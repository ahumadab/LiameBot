const Discord = require('discord.js')
const bot = new Discord.Client()
require('dotenv').config()


bot.commands = new Discord.Collection();
bot.scripts = new Discord.Collection();



const prefix = "!";

bot.on('ready', () => {
	console.log(`RotchBot Logged in as ${bot.user.tag}!`);  
  require('./utils/setScript').execute(bot)
});




bot.on('message', (message)=> {
  try {
		for (const [script] of bot.scripts) {
      bot.scripts.get(script).execute(message);
    }
	} catch (error) {
    console.error(error);
    message.reply("Une erreur s'est produite pendant l'execution du script.");
	}

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

bot.on('messageUpdate', (oldMessage, newMessage) => {
  try {
		for (const [script] of bot.scripts) {
      bot.scripts.get(script).execute(newMessage);
    }
	} catch (error) {
    console.error(error);
    message.reply("Une erreur s'est produite pendant l'execution du script.");
	}
})

bot.login(process.env.ROTCHBOT_TOKEN);