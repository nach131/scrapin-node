const cheerio = require('cheerio')
const request = require('request-promise')
const fs = require('fs-extra')

const writeStream = fs.createWriteStream('datos.json')

async function init () {
	const $ = await request({

		uri: 'https://www1.sedecatastro.gob.es/CYCBienInmueble/OVCConCiud.aspx?UrbRus=U&RefC=0026430DF3802E0001UX&RCCompleta=&via=BALMES&tipoVia=CL&numero=72&kilometro=&bloque=&escalera=&planta=&puerta=&DescProv=BARCELONA&prov=8&muni=900&DescMuni=BARCELONA&TipUR=U&codvia=307&comVia=BALMES%20(CALLE)&pest=urbana&from=OVCBusqueda&del=8&mun=900',
		transform: body => cheerio.load(body)
	})

	console.log(body)

}

init()