const axios = require('axios');

const fs = require('fs');
const writeStream = fs.createWriteStream('download.txt')



// Cargar el contenido del archivo JSON
fs.readFile('res.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  try {
    // Analizar el contenido JSON en un objeto
    const jsonData = JSON.parse(data);


    // console.log(jsonData.data.user.result.timeline_v2.timeline.instructions[0].moduleItems)

    // const media = jsonData.data.user.result.timeline_v2.timeline.instructions[2].entries[0].content
    const media = jsonData.data.user.result.timeline_v2.timeline.instructions[0].moduleItems

    // console.log(media)

    media.forEach(items => {


      // console.log(items.item.itemContent.tweet_results.result.legacy.entities.media[0].id_str)

      // console.log(items.item.itemContent.tweet_results.result.legacy.entities.media)
      const pics = items.item.itemContent.tweet_results.result.legacy.entities.media

      pics.forEach(pic => {

        console.log(pic.media_url_https)
        writeStream.write(`${pic.media_url_https}\n`)
      })

      // const cositas = items.item.itemContent.tweet_results.result.legacy.entities.media[0].media_url_https

      // console.log(cositas)

    })
    // media.items.forEach(items => {


    //   // console.log(items.item.itemContent.tweet_results.result.legacy.entities.media[0].id_str)

    //   console.log(items)

    //   // const cositas = items.item.itemContent.tweet_results.result.legacy.entities.media[0].media_url_https
    //   // writeStream.write(`${cositas}\n`)

    //   // console.log(cositas)

    // })


  } catch (error) {
    console.error('Error al analizar el JSON:', error);
  }
});
