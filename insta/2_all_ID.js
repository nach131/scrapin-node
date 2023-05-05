const fs = require('fs');

fs.readFile('1_posts.json', (err, data) => {
	if (err) throw err;
	const jsonData = JSON.parse(data);
	const id_post = jsonData.map(e => e.node.id)
	console.log(id_post)
	fs.writeFileSync('2_id_post.json', JSON.stringify(id_post));
});

