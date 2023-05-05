const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const writeStream = fs.createWriteStream('insta.json');

(async () => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.goto('https://www.instagram.com/elisa_dreams_fr/');


	// Espera a que se cargue la página
	await page.waitForSelector('.v1Nh3.kIKUG._bz0w');

	let html = await page.content();
	let $ = cheerio.load(html);

	// // Encuentra el número total de publicaciones
	let postCount = parseInt($('span.g47SY').eq(0).text().replace(',', ''));
	console.log(postCount)

	// // Hacer scroll down hasta que se hayan cargado todas las publicaciones
	// while ($('.v1Nh3.kIKUG._bz0w').length < postCount) {
	// 	await page.evaluate(() => {
	// 		window.scrollBy(0, window.innerHeight);
	// 	});

	// 	// Espera a que se cargue más contenido
	// 	await page.waitForSelector('.v1Nh3.kIKUG._bz0w:last-child');

	// 	// Analiza el nuevo contenido cargado en la página
	// 	html = await page.content();
	// 	$ = cheerio.load(html);
	// }

	// // Extrae la información de las publicaciones
	// const posts = [];
	// $('.v1Nh3.kIKUG._bz0w').each((i, el) => {
	// 	const img = $(el).find('img.FFVAD').attr('src');
	// 	const caption = $(el).find('a.sqdOP').attr('title');
	// 	posts.push({ img, caption });
	// });

	// // Escribe la información en un archivo JSON
	// writeStream.write(JSON.stringify(posts));

	await browser.close();
})();
