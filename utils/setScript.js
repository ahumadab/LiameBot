const fs = require('fs')
module.exports = {
    execute(bot) {
        console.log('setScript started')
        const scriptFiles = fs
            .readdirSync("./scripts")
            .filter((file) => file.endsWith(".js"));
        for (const file of scriptFiles) {
            const script = require(`../scripts/${file}`);
            bot.scripts.set(script.name, script);
        }
        const commandFiles = fs
            .readdirSync("./commands")
            .filter((file) => file.endsWith(".js"));
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            bot.commands.set(command.name, command);
        }
    }
}