const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Nombre de usuario de Twitter y número máximo de tweets a descargar
const userName = 'twitter_username';
const maxTweets = 1000; // Número máximo de tweets a descargar

// Directorio de destino para guardar los tweets
const downloadDir = 'twitter_tweets';

// Crea el directorio de destino si no existe
if (!fs.existsSync(downloadDir)) {
	fs.mkdirSync(downloadDir);
}

// Función para descargar los medios adjuntos de un tweet
async function downloadMedia (mediaUrl) {
	try {
		const response = await axios.get(mediaUrl, {
			responseType: 'stream'
		});

		const filename = path.basename(mediaUrl);
		const filePath = path.join(downloadDir, filename);
		const writeStream = fs.createWriteStream(filePath);

		response.data.pipe(writeStream);

		return new Promise((resolve, reject) => {
			writeStream.on('finish', () => {
				console.log(`Media ${filename} downloaded`);
				resolve();
			});

			writeStream.on('error', err => {
				console.error(`Error downloading media ${filename}:`, err);
				reject(err);
			});
		});
	} catch (err) {
		console.error('Error downloading media:', err);
		throw err;
	}
}

// Función para obtener los tweets del usuario y descargar los medios adjuntos
async function getAndDownloadTweets (userId, paginationToken = null) {
	try {
		const apiUrl = `https://api.twitter.com/2/users/${userId}/tweets?tweet.fields=attachments.media_keys&max_results=100${paginationToken ? `&pagination_token=${paginationToken}` : ''}`;

		const response = await axios.get(apiUrl, {
			headers: {
				Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA' // Reemplaza con tu token de autorización de Twitter
			}
		});

		const tweets = response.data.data;

		for (const tweet of tweets) {
			if (tweet.attachments && tweet.attachments.media_keys.length > 0) {
				for (const mediaKey of tweet.attachments.media_keys) {
					const mediaUrl = `https://api.twitter.com/1.1/media/show.json?media_id=${mediaKey}`;

					await downloadMedia(mediaUrl);
				}
			}
		}

		if (response.data.meta && response.data.meta.next_token && tweets.length > 0) {
			// Obtén más tweets si hay un token de paginación y todavía hay más tweets para descargar
			await getAndDownloadTweets(userId, response.data.meta.next_token);
		}
	} catch (err) {
		console.error('Error:', err);
		throw err;
	}
}

// Obtén el ID de usuario del nombre de usuario
axios.get(`https://api.twitter.com/2/users/by/username/${userName}`, {
	headers: {
		Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA' // Reemplaza con tu token de autorización de Twitter
	}
})
	.then(response => {
		const userId = response.data.data.id;
		console.log(userId)
		// getAndDownloadTweets(userId);
	})
	.catch(err => {
		console.error('Error:', err);
	});
