const USER = process.argv[2];

var axios = require('axios');
const cheerio = require('cheerio')
const fs = require('fs-extra')
require('dotenv').config()

const writeStream = fs.createWriteStream('wyylde.txt')

var config = {
	method: 'get',

	url: `https://www.wyylde.com/rest/mc/${USER}/video`,

	headers: {
		'authority': 'www.wyylde.com',
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'es-ES,es;q=0.9',
		'authorization': process.env.SECRET_KEY,
		'cache-control': 'no-cache',
		'cookie': process.env.COOKIE,
		'pragma': 'no-cache',
		'referer': 'https://www.wyylde.com/es-es/mediacenter/user/4705380/album/1238579448',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-origin',
		'sec-gpc': '1',
		'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
		'x-device': 'desktop',
		'x-version': '1664363116'
	}
}

axios(config)
	.then(function (res) {

		const video = res.data.data.videos
		fs.writeFileSync('1_posts.json', JSON.stringify(res.data));

		if (video) {
			video.map(items => {
				const play = items.play

				if (play) {
					const after = play.split('?')[0]
					console.log(after)
					writeStream.write(`${after}\n`)
				}
			})
		}
	})
	.catch(function (error) {
		console.log(error);
	});

