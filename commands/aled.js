module.exports = {
  name: "aled",
  description: "Envoie la liste de commandes disponibles",
  execute(message, args, bot) {
    const { commands } = bot
    const commandsList = []
    for (var [key, value] of commands) {
      let string = `\n!${value.name} -> ${value.description}`
      commandsList.push(string)
    }
    if (commandsList[0]) {
      const commandsString = commandsList.join()

      message.channel.send(`Commandes disponibles: ${commandsString}`);
    } else {
      message.channel.send(`Aucune commandes disponibles`);
    }
    
  },
};
  