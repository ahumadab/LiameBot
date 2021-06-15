module.exports = {
    name: "ping",
    description: "Renvoie un Pong",
    execute(message) {
      message.channel.send("Pong");
    },
  };
  