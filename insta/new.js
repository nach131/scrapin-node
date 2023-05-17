(async () => {
	const ig = new IgApiClient();

	// Autenticación de usuario y contraseña
	ig.state.generateDevice('username');
	await ig.account.login('username', 'password');

	// Obtener lista de archivos en la carpeta
	const files = fs.readdirSync('./folder');
	let numPush = 0;

	// Iterar sobre cada archivo y publicarlo en Instagram
	for (const file of files) {
		const imageBuffer = fs.readFileSync(`./folder/${file}`);
		const idFind = file.split("_")[0]
		const caption = await getCaption(idFind, hashtag)

		// Esperar un tiempo aleatorio antes de hacer la publicación
		const delay = Math.random() * 4000 + 1000; // Esperar entre 1 y 5 segundos
		await new Promise(resolve => setTimeout(resolve, delay));

		const publishResult = await ig.publish.photo({
			file: imageBuffer,
			caption: caption,
		});

		console.log(`La imagen ${file} se ha publicado correctamente:`, publishResult);
		//=========================================================================
		// pausa en la subida cada 4 espera 30 segundos
		if (numPush == 4) {
			await new Promise(resolve => setTimeout(resolve, 30000)); // Esperar 1 minutos 60000
			console.log("ESPERANDO");
			numPush = 0;
		}
		numPush++;
	}
	console.log(`Subidos ${numPush}`);
})();