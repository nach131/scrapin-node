const axios = require('axios');
const fs = require('fs');

let config = {
	method: 'get',
	maxBodyLength: Infinity,
	url: 'https://www.instagram.com/api/v1/friendships/48820281560/following/?count=12&max_id=12',
	headers: {
		'authority': 'www.instagram.com',
		'accept': '*/*',
		'accept-language': 'es-ES,es;q=0.8',
		'cache-control': 'no-cache',
		'cookie': 'mid=Y90x1AAEAAGhPdBSi6h-PmP1Zgv8; ig_did=969410AC-6060-4DEA-B485-6E4667D4A2B1; datr=mxXxY2eFpgIOelyEw4jVATbp; dpr=0.8999999761581421; csrftoken=QK78emMZD3BYk5P5uFS3z9iWjAQKp5Tt; ds_user_id=59200750713; shbid="2480\\05459200750713\\0541716492027:01f7640aaf3aa6582cecb732293075bf16543c5ef5edaca98015f464c2a913f71b5e7739"; shbts="1684956027\\05459200750713\\0541716492027:01f79f8f16ed7af98b32dc1fdc3ebd9db2a8048582674bec50cdb4c7b8030fdb0669417d"; sessionid=59200750713%3Ai0piu5EAmyiPJ1%3A27%3AAYclbPIdl27ThmbZZ4iN3XacEqyNw3TzYZotOciM2fM; rur="CLN\\05459200750713\\0541716580404:01f7d9a3267f8a838e039972fc223df830ee9d21cedd69daace43ab28649c66f87aa58fe"; csrftoken=bjxLMtPqxpDHpihtoBi2qu8DUDShcE4l; ds_user_id=59200750713; ig_did=10812A36-469F-4EBC-8FC6-E1C3589EDC79; mid=ZFKlAgAEAAFox0VvyhD4Ad8tPRXE; rur="CLN\\05459200750713\\0541716580558:01f7a4e9447f74a728a7104da03b09c913aa9816683b400e2c83f79fbefb4b98bb830cd9"',
		'pragma': 'no-cache',
		'referer': 'https://www.instagram.com/lalafitover50/following/',
		'sec-ch-ua': '"Brave";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"macOS"',
		'sec-ch-ua-platform-version': '"10.13.0"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-origin',
		'sec-gpc': '1',
		'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
		'x-asbd-id': '198387',
		'x-csrftoken': 'QK78emMZD3BYk5P5uFS3z9iWjAQKp5Tt',
		'x-ig-app-id': '936619743392459',
		'x-ig-www-claim': 'hmac.AR3gq4qvPq_uJ-zEKc1CKaRv4GtmoX1_0rcIgyFqh-Ta7dpa',
		'x-requested-with': 'XMLHttpRequest'
	}
};

const headers = {
	'authority': 'www.instagram.com',
	'accept': '*/*',
	'accept-language': 'es-ES,es;q=0.8',
	'cache-control': 'no-cache',
	'cookie': 'mid=Y90x1AAEAAGhPdBSi6h-PmP1Zgv8; ig_did=969410AC-6060-4DEA-B485-6E4667D4A2B1; datr=mxXxY2eFpgIOelyEw4jVATbp; dpr=0.8999999761581421; csrftoken=QK78emMZD3BYk5P5uFS3z9iWjAQKp5Tt; ds_user_id=59200750713; shbid="2480\\05459200750713\\0541716492027:01f7640aaf3aa6582cecb732293075bf16543c5ef5edaca98015f464c2a913f71b5e7739"; shbts="1684956027\\05459200750713\\0541716492027:01f79f8f16ed7af98b32dc1fdc3ebd9db2a8048582674bec50cdb4c7b8030fdb0669417d"; sessionid=59200750713%3Ai0piu5EAmyiPJ1%3A27%3AAYclbPIdl27ThmbZZ4iN3XacEqyNw3TzYZotOciM2fM; rur="CLN\\05459200750713\\0541716580404:01f7d9a3267f8a838e039972fc223df830ee9d21cedd69daace43ab28649c66f87aa58fe"; csrftoken=bjxLMtPqxpDHpihtoBi2qu8DUDShcE4l; ds_user_id=59200750713; ig_did=10812A36-469F-4EBC-8FC6-E1C3589EDC79; mid=ZFKlAgAEAAFox0VvyhD4Ad8tPRXE; rur="CLN\\05459200750713\\0541716580558:01f7a4e9447f74a728a7104da03b09c913aa9816683b400e2c83f79fbefb4b98bb830cd9"',
	'pragma': 'no-cache',
	'referer': 'https://www.instagram.com/lalafitover50/following/',
	'sec-ch-ua': '"Brave";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
	'sec-ch-ua-mobile': '?0',
	'sec-ch-ua-platform': '"macOS"',
	'sec-ch-ua-platform-version': '"10.13.0"',
	'sec-fetch-dest': 'empty',
	'sec-fetch-mode': 'cors',
	'sec-fetch-site': 'same-origin',
	'sec-gpc': '1',
	'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
	'x-asbd-id': '198387',
	'x-csrftoken': 'QK78emMZD3BYk5P5uFS3z9iWjAQKp5Tt',
	'x-ig-app-id': '936619743392459',
	'x-ig-www-claim': 'hmac.AR3gq4qvPq_uJ-zEKc1CKaRv4GtmoX1_0rcIgyFqh-Ta7dpa',
	'x-requested-with': 'XMLHttpRequest'
}

const getSeguidos = async (userId) => {
	let idPost = ''
	let followers = [];
	let hasMore = true;

	while (hasMore) {
		const url = `https://www.instagram.com/api/v1/friendships/48820281560/following/`;

		// const url = `https://www.instagram.com/api/v1/friendships/57574872944/followers/?count=32&max_id=${idPost}&search_surface=follow_list_page`;

		const res = await axios.get(url, { headers });

		console.log(url)

		const edges = res.data.users;
		idPost = res.data.next_max_id;
		followers = [...followers, ...edges];
		hasMore = res.data.big_list;

	}

	return (followers);
}

getSeguidos(userId).then(posts => {
	fs.writeFileSync(`${userName}.json`, JSON.stringify(posts));

	console.log(`Se han obtenido ${posts.length} publicaciones del usuario ${userId}`);

})
	.catch(err => console.error(err));

