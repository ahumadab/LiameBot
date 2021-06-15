module.exports = {
    name: "ping",
    description: "test test",
    execute(message) {
      message.channel.send("Pong");
    },
  };
  