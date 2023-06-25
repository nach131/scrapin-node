const Twit = require('twit');
const fs = require('fs');
const path = require('path');
require('dotenv').config()

console.log(process.env.YOUR_ACCESS_TOKEN)

// Configura las credenciales de acceso a la API de Twitter
const twitClient = new Twit({
	consumer_key: 'YOUR_CONSUMER_KEY',
	consumer_secret: 'YOUR_CONSUMER_SECRET',
	access_token: process.env.YOUR_ACCESS_TOKEN,
	access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET'
});

console.log(twitClient)

// // Nombre de usuario de Twitter y número máximo de tweets a descargar
// const userName = 'twitter_username';
// const maxTweets = 10;

// // Directorio de destino para guardar las imágenes
// const downloadDir = 'twitter_images';

// // Crea el directorio de destino si no existe
// if (!fs.existsSync(downloadDir)) {
// 	fs.mkdirSync(downloadDir);
// }

// // Obtén los tweets del usuario especificado
// twitClient.get('statuses/user_timeline', {
// 	screen_name: userName,
// 	count: maxTweets
// }, (err, data, response) => {
// 	if (err) {
// 		console.error('Error:', err);
// 		return;
// 	}

// 	// Descarga las imágenes de los tweets
// 	data.forEach(tweet => {
// 		if (tweet.entities.media && tweet.entities.media.length > 0) {
// 			tweet.entities.media.forEach(media => {
// 				if (media.type === 'photo') {
// 					const imageUrl = media.media_url_https;
// 					const filename = path.basename(imageUrl);
// 					const filePath = path.join(downloadDir, filename);

// 					const downloadStream = fs.createWriteStream(filePath);
// 					const request = twitClient.get(imageUrl, { responseType: 'stream' });

// 					request.then(response => {
// 						response.data.pipe(downloadStream);

// 						downloadStream.on('finish', () => {
// 							console.log(`Image ${filename} downloaded`);
// 						});

// 						downloadStream.on('error', err => {
// 							console.error(`Error downloading image ${filename}:`, err);
// 						});
// 					}).catch(err => {
// 						console.error(`Error fetching image ${filename}:`, err);
// 					});
// 				}
// 			});
// 		}
// 	});
// });
