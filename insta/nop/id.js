const axios = require('axios');
const fs = require('fs');

// const userId = '5481613434'; // Reemplazar con el ID de usuario real
const userId = '5481613434'; // Reemplazar con el ID de usuario real

axios.get(`https://www.instagram.com/graphql/query/?query_hash=472f257a40c653c64c666ce877d59d2b&variables={"id":"${userId}","first":50}`)
	.then(response => {
		const edges = response.data.data.user.edge_owner_to_timeline_media.edges;
		const postIds = edges.map(edge => edge.node.id);
		fs.writeFile('post_ids.json', JSON.stringify(postIds), (err) => {
			if (err) throw err;
			console.log('Post IDs written to file');
		});
	})
	.catch(error => {
		console.log(error);
	});
