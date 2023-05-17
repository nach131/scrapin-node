const fs = require('fs');
const { IgApiClient } = require('instagram-private-api');

(async () => {
	const ig = new IgApiClient();

	// Autenticación de usuario y contraseña
	ig.state.generateDevice('allelisadream');
	await ig.account.login('allelisadream', 'Armadura@114');

	// Obtener foto a publicar
	const imageBuffer = fs.readFileSync('2748039873836904700_44117456853.jpg');

	// Subir foto
	const publishResult = await ig.publish.photo({
		file: imageBuffer,
		caption: 'Descripción de la imagen',
	});

	console.log('La imagen se ha publicado correctamente:', publishResult);
})();
