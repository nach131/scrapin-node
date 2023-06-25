const axios = require('axios');
const fs = require('fs');

const userName = process.argv[2];

const downloadImage = async (url, path) => {
	const response = await axios({
		url,
		method: 'GET',
		responseType: 'stream'
	});

	response.data.pipe(fs.createWriteStream(path));

	return new Promise((resolve, reject) => {
		response.data.on('end', () => {
			resolve();
		});

		response.data.on('error', err => {
			reject(err);
		});
	});
};

fs.mkdir(userName, err => {
	if (err) {
		console.error(`Failed to create folder ${userName}: ${err}`);
		return;
	}

	fs.readFile(`${userName}.json`, (err, data) => {
		if (err) {
			console.error(`Failed to read file ${userName}.json: ${err}`);
			return;
		}

		const jsonData = JSON.parse(data);

		for (let i = 0; i < jsonData.length; i++) {
			if (jsonData[i].media_type === 1) {
				// IMAGE SOLA
				const url = jsonData[i].image_versions2.candidates[0].url;
				const filename = `${jsonData[i].id}.jpg`;
				const filePath = `${userName}/${filename}`;
				// console.log(url, filePath);

				downloadImage(url, filePath)
					.then(() => console.log(`Image ${filename} downloaded`))
					.catch(err => console.error(err));
			} else {
				let numCarro = jsonData[i].carousel_media_count;

				if (!numCarro) {
					// VIDEOS
					const url = jsonData[i].video_versions[0].url;
					const filename = `${jsonData[i].id}.mp4`;
					const filePath = `${userName}/${filename}`;
					// console.log(url, filePath);

					downloadImage(url, filePath)
						.then(() => console.log(`Video ${filename} downloaded`))
						.catch(err => console.error(err));
				} else {
					// CARRUSEL
					for (let j = 0; j < numCarro; j++) {
						const url = jsonData[i].carousel_media[j].image_versions2.candidates[0].url;
						const filename = `${jsonData[i].carousel_media[j].id}.jpg`;
						const filePath = `${userName}/${filename}`;
						// console.log(url, filePath);

						downloadImage(url, filePath)
							.then(() => console.log(`Image ${filename} downloaded`))
							.catch(err => console.error(err));
					}
				}
			}
		}
	});
});
