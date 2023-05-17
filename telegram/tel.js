const Telegraf = require('telegraf');
const fs = require('fs');

const bot = new Telegraf('6165559364:AAEiz-Fe2LG6PizFz5xzRIqB00WAkXwsSs4');

bot.start((ctx) => {
	ctx.reply('Hola! Envíame un mensaje con el enlace al canal de Telegram.');
});

bot.on('text', async (ctx) => {
	// Obtenemos el nombre del canal
	const channelName = ctx.message.text.split('/').pop();

	// Obtenemos la lista de mensajes del canal
	const messages = await ctx.telegram.getChatHistory(channelName);

	// Recorremos la lista de mensajes
	for (const message of messages) {
		// Si el mensaje contiene un archivo multimedia
		if (message.photo || message.video) {
			const media = message.photo ? message.photo : message.video;
			// Descargamos el archivo
			const file = await ctx.telegram.getFile(media.file_id);
			const url = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
			const response = await fetch(url);
			const buffer = await response.buffer();
			// Guardamos el archivo en el disco
			fs.writeFileSync(`./${media.file_id}.${media.file_name.split('.').pop()}`, buffer);
		}
	}

	ctx.reply('Listo! Los archivos han sido descargados.');
});

bot.launch();
