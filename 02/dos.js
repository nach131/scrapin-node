const fetch = require('isomorphic-fetch')
const cheerio = require('cheerio')

const symbols = ["AAPL", "TSLA"]

async function app() {
  for await (symbol of symbols) {
    const descripcion = await getDesctiption(symbol)
    console.log({ symbol, descripcion })
  }
}

async function getDesctiption(symbol) {

  const browser = await puppeteer.launch({ headles: false })
  const page = await browser.newPAge()
  await page.goto(

    `https://ih.advfn.com/stock-market/NASDAQ/${symbol}/stock-price`

  )

  await browser.close()
}

app()