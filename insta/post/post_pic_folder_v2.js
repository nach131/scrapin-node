const fs = require('fs');
const { IgApiClient } = require('instagram-private-api');


const hashtag = '\n#model #love #fashion #beauty #beautiful #sexywomen #lingerie #lingerieaddict #lingeriemodel #elisadream #elisadreams #hotwife #photography #photooftheday #sensualwoman #powergirl'


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
		fs.readFile('leomessi.json', (err, data) => {
			if (err) reject(err);
			const jsonData = JSON.parse(data);
			const filerPost = jsonData.find(e => e.id === idFind);
			if (filerPost.caption == null)
				resolve(hashtag)
			else {
				const caption = filerPost.caption.text;
				resolve(caption + ' ' + hashtag);
			}
		});
	});
};

(async () => {
	const ig = new IgApiClient();

	// Autenticación de usuario y contraseña
	ig.state.generateDevice('allelisadream');
	await ig.account.login('allelisadream', 'Armadura@114');

	// Obtener lista de archivos en la carpeta
	const files = fs.readdirSync('./folder');

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
	}
})();



