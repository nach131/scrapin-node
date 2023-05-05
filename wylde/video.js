const USER =617691
var axios = require('axios');
const cheerio = require('cheerio')
const fs = require('fs-extra')
require('dotenv').config()

const writeStream = fs.createWriteStream('wyylde.txt')

// 2670144
// 4277974

const ALBUM = 1239135593

var config = {
	method: 'get',

	// url: `https://www.wyylde.com/rest/mc/${USER}/album/${ALBUM}`,

	//======================PORTADA============================================

	url: `https://www.wyylde.com/rest/mc/${USER}/video`,

	// url: `https://www.wyylde.com/rest/mc/${USER}/album/0`,

	//======================ORIGINAL===========================================
	// url: 'https://www.wyylde.com/rest/mc/4705380/album/1238579448?nocache=1664520045974&version=4.1.0',
	headers: {
		'authority': 'www.wyylde.com',
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'es-ES,es;q=0.9',
		'authorization': process.env.SECRET_KEY,
		'cache-control': 'no-cache',
		'cookie': 'session_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGV0bSI6MTY1OTM4NzM2MSwiX19pZCI6IjQ3NzE1MDMiLCJfX25hbWUiOiJzb3BoaWVibG9uZGUiLCJfX3N0YXRlcyI6W10sInBhc3N3b3JkX3VwZGF0ZWQiOnsicGFzc3dvcmRfdXBkYXRlZF9kdCI6bnVsbH19.8RpVxON_ZZB5QBxHz-NchYv7ffyeGxmCYN_xIZ5ALeU; _scid=960786c6-6352-48e0-9e43-827cf2d74f5c; AeFirst63072a4ce188f131d6d1c7fe=1661941932360; _gid=GA1.2.2071736144.1662827882; PAPVisitorId=GO3GltyshfLWJ7jVfqR8ZWHCoprJSJpI; PAPVisitorId=GO3GltyshfLWJ7jVfqR8ZWHCoprJSJpI; query_string=%7B%22travelId%22%3A%22cbff8000-57e5-11ed-a692-3b54edbb1dba%22%7D; ajs_user_id=4771503; ajs_anonymous_id=1ebb4539-247f-4627-b170-3badf48cb111; __stripe_mid=432c9f06-e802-4f46-8e9a-ef3ddaaaa960fbc57d; _ga=GA1.2.1304171703.1661466083; _gat_UA-173595-23=1; AWSALB=+RXZ5xNuJmALNp8J+i0tURF1zW5tCVspisdYDeVjzFjFrzwAaXO/e2owjwiOhDgUcw1JLea1luERKM5Om6Iabmqw4hGkB6QrOA03B5aYIkqEGEx4ZhSD8oPQEu+z; _ga_VWPKMML4YS=GS1.1.1664519304.215.1.1664520045.0.0.0; AWSALB=Kaj2R8Q+gHhcGiLB9+k5fUMDQTDCq106GXu8Dwii8TSKcljDieZPUaeYNVP0KjPP8iyQHmBlFuYdYgxSMtEr9pP3Qrg26hspfM8OX1vxkoOMLNH+8PcuZ7DYL0JY; AWSALBCORS=Kaj2R8Q+gHhcGiLB9+k5fUMDQTDCq106GXu8Dwii8TSKcljDieZPUaeYNVP0KjPP8iyQHmBlFuYdYgxSMtEr9pP3Qrg26hspfM8OX1vxkoOMLNH+8PcuZ7DYL0JY',
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

		// console.log(res.data.data.videos)
		const pictures = res.data.data.pictures
		const video = res.data.data.videos

		if (pictures) {
			pictures.map(items => {
				const full = items.full

				// const after = full.split('?')[0]

				console.log(full)
				writeStream.write(`${full}\n`)
			})
		}
		else if (video) {
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

