const fs = require('fs-extra')

const writeStream = fs.createWriteStream('wyylde.txt')

const video = require('./video.json')

video.map(items => {
	const play = items.play
	const after = play.split('?')[0]

	console.log(after)
	writeStream.write(`${after}\n`)
})