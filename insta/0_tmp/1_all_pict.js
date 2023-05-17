const axios = require('axios');
const fs = require('fs');

const userName = 'KryssRockz'

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

fs.readFile(`${userName}.json`, (err, data) => {
	if (err) throw err;
	const jsonData = JSON.parse(data);

	for (let i = 0; i < jsonData.length; i++) {
		if (jsonData[i].media_type == 1) {
			const url = jsonData[i].image_versions2.candidates[0].url;
			const filename = `${jsonData[i].id}.jpg`

			downloadImage(url, filename)
				.then(() => console.log(`Image ${filename} downloaded`))
				.catch(err => console.error(err));
		}
		else {
			let numCarro = jsonData[i].carousel_media_count
			for (let j = 0; j < numCarro; j++) {
				const url = jsonData[i].carousel_media[j].image_versions2.candidates[0].url;
				const filename = `${jsonData[i].carousel_media[j].id}.jpg`

				downloadImage(url, filename)
					.then(() => console.log(`Image ${filename} downloaded`))
					.catch(err => console.error(err));
			}
		}

	}
});
