const { TwitterApiClient } = require('twitter-api-client');
const fs = require('fs');
const path = require('path');
require('dotenv').config()

// Configura las credenciales de acceso a la API de Twitter
const twitterClient_nach = new TwitterApiClient({
	appKey: process.env.YOUR_APP_KEY,
	appSecret: process.env.YOUR_APP_SECRET,
	accessToken: process.env.YOUR_ACCESS_TOKEN,
	accessSecret: process.env.YOUR_ACCESS_TOKEN_SECRET
});

console.log(twitterClient_nach)

// // Nombre de usuario de Twitter y número máximo de tweets a descargar
// const userName = 'kitty_baby_k';
// const maxTweets = 10;

// // Directorio de destino para guardar las imágenes
// const downloadDir = 'twitter_images';

// // Crea el directorio de destino si no existe
// if (!fs.existsSync(downloadDir)) {
// 	fs.mkdirSync(downloadDir);
// }

// // Obtén los tweets del usuario especificado
// twitterClient.tweets.statusesUserTimeline({
// 	screen_name: userName,
// 	count: maxTweets
// }).then(tweets => {
// 	// Descarga las imágenes de los tweets
// 	tweets.forEach(tweet => {
// 		if (tweet.entities.media && tweet.entities.media.length > 0) {
// 			tweet.entities.media.forEach(media => {
// 				if (media.type === 'photo') {
// 					const imageUrl = media.media_url_https;
// 					const filename = path.basename(imageUrl);
// 					const filePath = path.join(downloadDir, filename);

// 					const downloadStream = fs.createWriteStream(filePath);
// 					const request = twitterClient.media.mediaDownload({
// 						media_id: media.id_str,
// 						responseType: 'stream'
// 					});

// 					request.then(response => {
// 						response.pipe(downloadStream);

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
// }).catch(err => {
// 	console.error('Error:', err);
// });
