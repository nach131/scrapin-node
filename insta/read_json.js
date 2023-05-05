const fs = require('fs');

fs.readFile('a.json', (err, data) => {
	if (err) throw err;
	const jsonData = JSON.parse(data);
	jsonData.map(e => console.log(e.image_versions2.candidates[0].url))
	// jsonData.map(e => console.log(e))
	// const id_post = jsonData.map(e => e.node.id)
	// console.log(id_post)
	// fs.writeFileSync('2_id_post.json', JSON.stringify(id_post));
});

