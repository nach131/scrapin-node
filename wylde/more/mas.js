const fs = require('fs');
const { exec } = require('child_process');
const { default: axios } = require('axios');

// Ruta de la carpeta que contiene los archivos txt
const carpeta = './esto';


const downloadImage = async (url, path) => {
	const response = await axios({
		method: 'GET',
		maxBodyLength: Infinity,
		url,
		headers: {}
		// responseType: 'stream'
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

// Función para leer los archivos txt en la carpeta
fs.readdir(carpeta, (err, files) => {
	if (err) {
		console.error('Error al leer la carpeta:', err);
		return;
	}
	// Recorre cada archivo txt encontrado
	files.forEach(file => {
		// Verifica que sea un archivo txt
		if (file.endsWith('.txt')) {
			var numero = 1;
			// Lee el contenido del archivo txt
			fs.readFile(`${carpeta}/${file}`, 'utf8', (err, data) => {
				if (err) {
					console.error(`Error al leer el archivo ${file}:`, err);
					return;
				}

				// Divide el contenido por líneas
				// const lines = data.split('\n');
				const command = ` wget --user-agent=Mozilla -i ${carpeta}/${file}`;

				exec(command, (err) => {
					if (err) {
						console.error(`Error al descargar la imagen :`, err);
					} else {
						console.log(`Archivo descargada ${file}`);
					}
				});

				// Crea una carpeta con el nombre del archivo txt (sin la extensión)
				const folderName = file.slice(0, -4);
				// fs.mkdirSync(folderName, { recursive: true });


			});
		}
	});
});

