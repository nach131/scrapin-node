const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const path = require('path');
require('dotenv').config()

// Configura las credenciales de acceso a la API de Twitter
const twitterClient = new TwitterApi({
	appKey: process.env.YOUR_APP_KEY,
	appSecret: process.env.YOUR_APP_SECRET,
	accessToken: process.env.YOUR_ACCESS_TOKEN,
	accessSecret: process.env.YOUR_ACCESS_TOKEN_SECRET
});


// Nombre de usuario de Twitter y número máximo de tweets a descargar
const userName = 'kitty_baby_k';
const maxTweets = 10;

// Directorio de destino para guardar las imágenes
const downloadDir = 'kitty_baby_k';

// Crea el directorio de destino si no existe
if (!fs.existsSync(downloadDir)) {
	fs.mkdirSync(downloadDir);
}

// Obtén los tweets del usuario especificado
twitterClient.v2.userByUsername(userName)
	.then(user => {
		return twitterClient.v2.userTweets(user.data.id, {
			tweet_fields: 'attachments.media_keys',
			max_results: maxTweets
		});
	})
	.then(tweets => {
		// Descarga las imágenes de los tweets
		tweets.data.forEach(tweet => {
			if (tweet.attachments && tweet.attachments.media_keys.length > 0) {
				tweet.attachments.media_keys.forEach(async mediaKey => {
					const media = await twitterClient.v2.media(mediaKey);
					const imageUrl = media.data.url;
					const filename = path.basename(imageUrl);
					const filePath = path.join(downloadDir, filename);

					const downloadStream = fs.createWriteStream(filePath);
					const request = twitterClient.v2.media(mediaKey);

					request.then(response => {
						response.data.pipe(downloadStream);

						downloadStream.on('finish', () => {
							console.log(`Image ${filename} downloaded`);
						});

						downloadStream.on('error', err => {
							console.error(`Error downloading image ${filename}:`, err);
						});
					}).catch(err => {
						console.error(`Error fetching image ${filename}:`, err);
					});
				});
			}
		});
	})
	.catch(err => {
		console.error('Error:', err);
	});
