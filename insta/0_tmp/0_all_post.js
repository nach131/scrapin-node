const axios = require('axios');
const fs = require('fs');

const userId = '57690701801';
const userName = 'KryssRockz';

const headers = {
	'authority': 'www.instagram.com',
	'accept': '*/*',
	'accept-language': 'es-ES,es;q=0.8',
	'cache-control': 'no-cache',
	'cookie': 'mid=Y90x1AAEAAGhPdBSi6h-PmP1Zgv8; ig_did=969410AC-6060-4DEA-B485-6E4667D4A2B1; datr=mxXxY2eFpgIOelyEw4jVATbp; ds_user_id=59200750713; dpr=0.8999999761581421; shbid="2480\\05459200750713\\0541715178048:01f77314b646257967c82d68089a9d3ddc4c11aff6d04f7dca85c28431439873096f1d31"; shbts="1683642048\\05459200750713\\0541715178048:01f790da53c44110a376ce72be2679f36554fb790a69927336add449f5d03aa9733ea435"; csrftoken=HUwQN1WoEPlatm9Laz8YmEbVH3y0O51U; sessionid=59200750713%3A1fMNzquGbfjHde%3A20%3AAYc3QUkyb3d_wzYAATzUQXlbv8TJB7vJH8VoLSCyhA; rur="CLN\\05459200750713\\0541715352523:01f7ee3f29268f7b83d4d2c6a3b824e53e9882f674fa4b62686214829cb424a4649a24a8"; csrftoken=bjxLMtPqxpDHpihtoBi2qu8DUDShcE4l; ds_user_id=59200750713; ig_did=10812A36-469F-4EBC-8FC6-E1C3589EDC79; mid=ZFKlAgAEAAFox0VvyhD4Ad8tPRXE',
	'pragma': 'no-cache',
	'referer': 'https://www.instagram.com/kryss.rockz/',
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
	'x-csrftoken': 'HUwQN1WoEPlatm9Laz8YmEbVH3y0O51U',
	'x-ig-app-id': '936619743392459',
	'x-ig-www-claim': 'hmac.AR3gq4qvPq_uJ-zEKc1CKaRv4GtmoX1_0rcIgyFqh-Ta7Ufj',
	'x-requested-with': 'XMLHttpRequest'
}

const getPosts = async (userId) => {
	let idPost = ''
	let posts = [];
	let hasMore = true;
	let i = 0;

	while (hasMore) {
		const url = `https://www.instagram.com/api/v1/feed/user/${userId}/?count=32&max_id=${idPost}`;
		const res = await axios.get(url, { headers });

		const edges = res.data.items;
		idPost = res.data.next_max_id;
		posts = [...posts, ...edges];
		hasMore = res.data.more_available;
		if (i == 20) {
			await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundos
			console.log("ESPERANDO");
			i = 0;
		}
		console.log(i++);
	}

	return (posts);
}

getPosts(userId).then(posts => {
	fs.writeFileSync(`${userName}.json`, JSON.stringify(posts));

	console.log(`Se han obtenido ${posts.length} publicaciones del usuario ${userId}`);

})
	.catch(err => console.error(err));
