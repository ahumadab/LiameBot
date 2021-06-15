const axios = require("axios");
require('dotenv').config()

module.exports = {
    name: "ASMinotor",
    description: "Remove every liks of ASMinotor",
    execute(message) {
      const googleApiKey = process.env.GOGOLE_API_KEY; // Need to be updated
      const idASMinotoR = "UCB8il9i9Bl9mxEaCaClFEXQ"; // Id public de ce gros shlag

      if (message.content.includes("https://youtu.be") ||
          message.content.includes("https://www.youtube")) {
        const position = message.content.indexOf("https://youtu.be") !== -1? message.content.indexOf("https://youtu.be"): message.content.indexOf("https://www.youtube");
        const urlYoutubeWithRest = message.content.slice(position);
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = urlYoutubeWithRest.match(regExp);
        if (match && match[7].length === 11) {
          const idYoutubeWithRest = match[7];
          const idYoutube = idYoutubeWithRest.slice(0, 11);

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
    