const cheerio = require('cheerio')
const request = require('request-promise')
const fs = require('fs-extra')

const writeStream = fs.createWriteStream('quotes.csv')

async function init() {
  const $ = await request({
    uri: 'http://quotes.toscrape.com/',
    transform: body => cheerio.load(body)
  })

  writeStream.write('Qoute|Author|Tags\n')

  $('.quote').each((i, el) => {
    // console.log(i, $(el).html())
    const text = $(el).find('span.text').text().replace(/(^\“|\”$)/g, "")
    const author = $(el).find('span small.author').text()
    const tags = []
    $(el).find('.tags a.tag').each((i, el) => tags.push($(el).text()))
    // console.log(tags)
    console.log(tags.join(',')) // para tener string separados x comas
    writeStream.write(`${text}|${author}|${tags}\n`)

  })


}

init()