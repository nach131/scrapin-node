const cheerio = require('cheerio')
const request = require('request-promise')

async function init() {
  const $ = await request({
    uri: 'http://ticket.enunpimpam.com/',
    transform: body => cheerio.load(body)
  })


  const webtitle = $('title')
  console.log(webtitle.html())

  const masthead = $('body .masthead')
  console.log(masthead.html())




}

init()