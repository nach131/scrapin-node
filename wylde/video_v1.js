const userId = process.argv[2];

var axios = require('axios');
const cheerio = require('cheerio')
const fs = require('fs-extra')
require('dotenv').config()

const writeStream = fs.createWriteStream('wyylde.txt')

const headers = {
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

let num = 0;

const getPosts = async (userId) => {
	let next_id = '';
	let hasNextPage = true;
	let posts = [];

	while (hasNextPage) {
		const url = `https://www.wyylde.com/rest/mc/${userId}/videos/${next_id}`;

		const res = await axios.get(url, { headers });

		const { videos, next } = res.data.data;

		if (videos) {
			videos.map(items => {
				const play = items.play

				if (play) {
					const after = play.split('?')[0]
					console.log(after)
					num++;
					writeStream.write(`${after}\n`)
				}
			})
		}

		posts = [...posts, ...videos];

		next_id = next;
		if (!next)
			hasNextPage = false;
	}
	return posts;
};

getPosts(userId).then(posts => {
	// fs.writeFileSync('1_posts.json', JSON.stringify(posts));
	console.log(`Se han obtenido ${num} videos del usuario ${userId}`);
}).catch(err => console.error(err));
