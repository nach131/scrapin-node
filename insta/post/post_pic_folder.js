const fs = require('fs');
const { IgApiClient } = require('instagram-private-api');

// const hashtag = '#sexywomen #lingerie #lingerieaddict #lingeriemodel #elisadream #elisadreams #hotwife'

const filePath = 'folder/.DS_Store';
fs.unlink(filePath, (error) => {
	if (error) {
		return
		console.error(error);
	} else {
		console.log('Archivo .DS_Store eliminado correctamente');
	}
});


(async () => {
	const ig = new IgApiClient();

	// Autenticación de usuario y contraseña
	ig.state.generateDevice('allelisadream');
	await ig.account.login('allelisadream', 'Armadura@114');

	// Obtener lista de archivos en la carpeta
	// const files = fs.readdirSync('/path/to/folder');
	const files = fs.readdirSync('./folder');

	// Iterar sobre cada archivo y publicarlo en Instagram
	for (const file of files) {
		// const imageBuffer = fs.readFileSync(`/path/to/folder/${file}`);
		const imageBuffer = fs.readFileSync(`./folder/${file}`);
		const publishResult = await ig.publish.photo({
			file: imageBuffer,
			caption: '#model #love #fashion #beauty #beautiful #sexywomen #lingerie #lingerieaddict #lingeriemodel #elisadream #elisadreams #hotwife #photography #photooftheday',
		});
		console.log(`La imagen ${file} se ha publicado correctamente:`, publishResult);
	}
})();
