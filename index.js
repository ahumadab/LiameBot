const Discord = require('discord.js')
const bot = Discord.Client()
require('dotenv').config()

bot.on('ready', () => {
	console.log(`RotchBot Logged in as ${bot.user.tag}!`);
});


bot.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

bot.login(process.env.ROTCHBOT_TOKEN);