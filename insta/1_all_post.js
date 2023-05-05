const axios = require('axios');
const fs = require('fs');

const headers = {
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
};
// const userId = '5481613434';//nadia
const userId = '11050184';
// const userId = '44117456853';

const getPosts = async (userId) => {
	let endCursor = '';
	let hasNextPage = true;
	let posts = [];

	while (hasNextPage) {
		const url = `https://www.instagram.com/graphql/query/?query_hash=472f257a40c653c64c666ce877d59d2b&variables={"id":"${userId}","first":50,"after":"${endCursor}"}`;

		const response = await axios.get(url, { headers });

		const { edges, page_info } = response.data.data.user.edge_owner_to_timeline_media;

		posts = [...posts, ...edges];

		hasNextPage = page_info.has_next_page;
		endCursor = page_info.end_cursor;
	}

	return posts;
};

getPosts(userId).then(posts => {
	fs.writeFileSync('1_posts.json', JSON.stringify(posts));
	console.log(`Se han obtenido ${posts.length} publicaciones del usuario ${userId}`);
}).catch(err => console.error(err));
