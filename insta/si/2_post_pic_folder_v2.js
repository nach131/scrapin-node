const fs = require('fs');
const { IgApiClient } = require('instagram-private-api');
const jsonData = require('./leomessi.json');

const hashtag = '\n#messi #love #fashion #beauty #leomessi #lionemessi #lionelandresmessi #campeondelmundo #argentina #futbol #photography #photooftheday #barça #psg'

const filePath = 'folder/.DS_Store';
fs.unlink(filePath, (error) => {
	if (error) {
		return
		console.error(error);
	} else {
		console.log('Archivo .DS_Store eliminado correctamente');
	}
});

const getCaption = (idFind, hashtag) => {
	return new Promise((resolve, reject) => {
		const { caption } = jsonData.find(e => e.id === idFind);
		if (caption == null) {
			resolve(hashtag);
		} else {
			resolve(caption.text + hashtag);
		}
	});
};

(async () => {
	const ig = new IgApiClient();

	// Autenticación de usuario y contraseña
	ig.state.generateDevice('messi_campeon_mundo');
	await ig.account.login('messi_campeon_mundo', 'Arnadura@114');

	// Obtener lista de archivos en la carpeta
	const files = fs.readdirSync('./folder');
	let numPush = 0;

	// Iterar sobre cada archivo y publicarlo en Instagram
	for (const file of files) {
		const imageBuffer = fs.readFileSync(`./folder/${file}`);
		const idFind = file.replace(/\.jpg$/, '');
		const caption = await getCaption(idFind, hashtag)
		const publishResult = await ig.publish.photo({
			file: imageBuffer,
			caption: caption,
		});
		console.log(`La imagen ${file} se ha publicado correctamente:`, publishResult);
		numPush++;
	}
	console.log(`Subidos ${numPush}`);
})();



