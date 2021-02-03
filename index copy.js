const cheerio = require('cheerio')
const request = require('request-promise')
const fs = require('fs-extra')

const writeStream = fs.createReadStream('quotes.csv')

async function init() {
  const $ = await request({
    uri: 'http://quotes.toscrape.com/',
    transform: body => cheerio.load(body)
  })

  // async function init() {
  //   const $ = await request({
  //     uri: 'http://ticket.enunpimpam.com/',
  //     transform: body => cheerio.load(body)
  //   })

  const webtitle = $('title')
  console.log(webtitle.html())

  const websiteHead = $('h1')
  console.log(websiteHead.text().trim())

  const quote = $('.quote').next().next()
  // console.log(quote.html())

  const containerClass = $('.row .col-md-8').parent().next()
  // console.log(containerClass.html())

  // const quotes = $('.quote span.text').each((i, el) => {
  //   // console.log(i, $(el).text())
  //   const quote_text = $(el).text()
  //   const quote = quote_text.replace(/(^\“|\”$)/g, "")
  //   console.log(i, quote)

  // })

  $('.quote').each((i, el) => {
    // console.log(i, $(el).html())
    const text = $(el).find('span.text').text().replace(/(^\“|\”$)/g, "")
    const author = $(el).find('span small.author').text()
    const tags = []

    $(el).find('.tags a.tag').each((i, el) => tags.push($(el).text()))
    // console.log(tags)
    console.log(tags.join(',')) // para tener string separados x comas

  })


}

init()