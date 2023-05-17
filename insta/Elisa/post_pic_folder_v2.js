const fs = require('fs');
const _ = require('lodash');

const { IgApiClient } = require('instagram-private-api');

const jsonData = require('./elisa_dreams_fr');

// NO "#beautiful"

const words = [" #hot #love", "#beauty", "#fashion", "#model", "#photooftheday", "#powergirl", "#sun", "#training", "#swimming", "#fitness", "#selflove #beach #ibiza, #corset #beachlife #friends #bikini #microbikini #goodtimes #minidress #bodybuilding #gym #me #womanstyle #openminded #fitnessgirl"
];

// a estudio
// #fitwife #fitmom #workout


const adult = [
	"#elysaexhib", "#lingerie", "#lingerieaddict", "#lingeriemodel", "#elisadream", "#elisadreams", "#hotwife", "#photography", "#photooftheday", "#sensualwoman", "#powergirl", "#adultwork", "#onlyfanspromo", "#onlyfansgirls", "#onlyfansbabe", "#onlyfansmodel", "#qos, #latex #hotmodels #minibikini #gymmotivation"
]

// NO "#onlyfans", 

// combina los words
const getHashtag = (words, adult) => {
	const rWords_v1 = _.sampleSize(words, 6);
	const rWords_v2 = _.sampleSize(adult, 10);
	return rWords_v1.concat(rWords_v2).join(' ');
}

const line = "\n===================================================================\n";

// Borrar .DS_Store
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
		const post = jsonData.find(e => e.pk === idFind);
		const caption = post ? post.caption || null : null;
		if (!caption)
			resolve(hashtag);
		else if (caption)
			resolve(caption.text + hashtag);
	});
};

let totalPush = 0;

(async () => {

	try {
		const ig = new IgApiClient();

		// Combinar Hashtag
		const hashtag = getHashtag(words, adult);

		// Autenticación de usuario y contraseña
		ig.state.generateDevice('allelisadream');
		await ig.account.login('allelisadream', 'Armadura@114');

		// Obtener lista de archivos en la carpeta
		const files = fs.readdirSync('./folder');
		let numPush = 0;

		// Iterar sobre cada archivo y publicarlo en Instagram
		for (const file of files) {
			const imageBuffer = fs.readFileSync(`./folder/${file}`);
			const idFind = file.split("_")[0]

			let caption = await getCaption(idFind, hashtag)

			console.log(caption, line)

			// Esperar un tiempo aleatorio antes de hacer la publicación
			const delay = Math.random() * 100000 + 40000; // Esperar entre 1 y 5 segundos
			console.log(`ESPERANDO... ${delay / 6000}`);
			// const delay = Math.random() * 4000 + 1000; // Esperar entre 1 y 5 segundos
			await new Promise(resolve => setTimeout(resolve, delay));

			const publishResult = await ig.publish.photo({
				file: imageBuffer,
				caption: caption,
			});

			caption = ''; // ESTO PARA REINICIR

			console.log(`La imagen ${file} se ha publicado correctamente:\n`, publishResult);
			// pausa en la subida cada 4 espera 30 segundos
			if (numPush == 3) {
				await new Promise(resolve => setTimeout(resolve, 60000)); // Esperar 1 minutos 60000
				console.log("\tEsperando reinicio...\n");
				numPush = 0;
			}
			numPush++;
			totalPush++;
		}
		console.log(`Subidos ${totalPush}`);
	} catch (err) {
		console.log(`Upsss: total subidos: ${totalPush}\n`, err);
	}
})();
