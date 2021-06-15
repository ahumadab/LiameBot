const axios = require("axios");
require('dotenv').config()

module.exports = {
    name: "ASMinotor",
    description: "Remove every liks of ASMinotor",
    execute(message) {
      const googleApiKey = process.env.GOGOLE_API_KEY; // Need to be updated
      const idASMinotoR = "UCB8il9i9Bl9mxEaCaClFEXQ"; // Id public de ce gros shlag

      if (message.content.includes("youtu")) {
        const position = message.content.indexOf("https://youtu.be") !== -1? message.content.indexOf("https://youtu.be"): message.content.indexOf("https://www.youtube");
        const regExp = /^.*(?:http:|https:)*?\/\/(?:www\.|)(?:youtube\.com|m\.youtube\.com|youtu\.|youtube-nocookie\.com).*(?:v=|v%3D|v\/|(?:a|p)\/(?:a|u)\/\d.*\/|watch\?|vi(?:=|\/)|\/embed\/|oembed\?|be\/|e\/)([^&?%#\/\n]*).*/;
        const match = message.content.match(regExp);
        if (match && match[1].length === 11) {
          const idYoutube = match[1]

          axios
            .get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${idYoutube}&key=${googleApiKey}`)
            .then((res) => {
              // console.log(res.data.items[0].snippet);
              if (res.data.items[0].snippet.channelId === idASMinotoR) {
                console.log("Message deleted");
                message.delete();
                // await axios
                //   .post('https://faceapp-api.glitch.me/', {})
                // https://faceapp-api.glitch.me/ {img https://faceapp-api.glitch.me/original.jpg?1617880349654} {img https://faceapp-api.glitch.me/smile_2.jpg?1617880349654}" }
                message.channel.send(
                  `${res.data.items[0].snippet.thumbnails.maxres.url}`
                );
              }
            })
            .catch((err) => console.error(err));
        }
      }
      
    }, // fin du execute
  };
    