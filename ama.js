const cheerio = require('cheerio')
const request = require('request-promise')
const fs = require('fs-extra')
const { linkSync } = require('fs-extra')

const writeStream = fs.createWriteStream('toma.txt')

async function init() {
  const $ = await request({
    uri: 'https://www.amateri.com/es/album/2544876/fajn-dopoledne-p/',
    transform: body => cheerio.load(body)
  })


  $('a.photoswipe.thumbnail__image').each((i, el) => {
    // console.log(i, $(el).attr('href'))
    const img = $(el).attr('href')
    img2 = img.replace('500x500.jpg', '3000x3000.jpg')
    // console.log(img.replace('500x500.jpg', '3000x3000.jpg'))

    writeStream.write(`${img2}\n`)
  })






}

init()