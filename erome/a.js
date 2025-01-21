const axios = require('axios');
const fs = require('fs');

const VIDEO = process.argv[2];

let config = {
	method: 'get',
	url: `https://v16.erome.com/1237/LWJl3oKp/${VIDEO}`,
	responseType: 'stream',
	headers: {
		'Accept': '*/*',
		'Accept-Language': 'es-ES,es;q=0.9',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
		'Pragma': 'no-cache',
		'Range': 'bytes=0-',
		'Referer': 'https://www.erome.com/',
		'Sec-Fetch-Dest': 'video',
		'Sec-Fetch-Mode': 'no-cors',
		'Sec-Fetch-Site': 'same-site',
		'Sec-GPC': '1',
		'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
		'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Brave";v="114"',
		'sec-ch-ua-mobile': '?1',
		'sec-ch-ua-platform': '"Android"'
	}
};

axios.request(config)
	.then((response) => {
		response.data.pipe(fs.createWriteStream(VIDEO))
			.on('finish', () => {
				console.log('El archivo MP4 se ha guardado correctamente.');
			})
			.on('error', (error) => {
				console.error('Error al guardar el archivo:', error);
			});
	})
	.catch((error) => {
		console.error('Error en la solicitud:', error);
	});


	// https://v16.erome.com/1237/LWJl3oKp/xjR7tmoQ_720p.mp4