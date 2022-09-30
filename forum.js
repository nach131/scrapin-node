const cheerio = require('cheerio')
const request = require('request-promise')
const fs = require('fs-extra')

const writeStream = fs.createWriteStream('toma.txt')

async function init() {
  const $ = await request({
    uri: 'https://forum.phun.org/threads/justins-24k-aellagirl.3580785/',
    transform: body => cheerio.load(body)
  })


  $('img').each((i, el) => {
    // console.log(i, $(el).attr('src'))
    const img = $(el).attr('src')
    img2 = img.replace('thumbs', 'images')

    writeStream.write(`${img2}\n`)
  })

}

init()

// wget --user-agent="Mozilla" -i toma.txt


// https://t48.pixhost.to/thumbs/318/177550840_b01.jpg

// https://img48.pixhost.to/images/318/177550840_b01.jpg