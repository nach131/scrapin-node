const { Telegraf } = require('telegraf');

const bot = new Telegraf('6165559364:AAEiz-Fe2LG6PizFz5xzRIqB00WAkXwsSs4');

console.log(bot)

// bot.command('getname', async (ctx) => {
// 	const chatId = ctx.chat.id;
// 	const chatInfo = await ctx.telegram.getChat(chatId);

// 	console.log(ctx)

// 	if (chatInfo.type === 'channel') {
// 		ctx.reply(`El nombre del canal es ${chatInfo.title}`);
// 	} else {
// 		ctx.reply('Este chat no es un canal.');
// 	}
// });

bot.launch();
