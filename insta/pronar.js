const axios = require('axios');
const fs = require('fs');

// ID del post de Instagram
const postId = '2871268210985466425';

// URL de la API de Instagram para obtener la información del post
const apiUrl = `https://www.instagram.com/p/${postId}/?__a=1`;

// Realizamos una petición GET a la API de Instagram para obtener la información del post
axios.get(apiUrl)
	.then(response => {
		// Obtenemos la URL de la imagen del post
		const imageUrl = response.data.graphql.shortcode_media.display_resources.pop().src;
		// Realizamos una petición GET a la URL de la imagen para obtener su contenido
		axios.get(imageUrl, { responseType: 'stream' })
			.then(response => {
				// Creamos un archivo en el sistema de archivos y escribimos el contenido de la imagen
				response.data.pipe(fs.createWriteStream(`imagen_${postId}.jpg`));
			})
			.catch(error => console.log(error));
	})
	.catch(error => console.log(error));


