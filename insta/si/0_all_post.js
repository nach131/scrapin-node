const axios = require('axios');
const fs = require('fs');

const userId = '52960547745';
const userName = 'alessandra_jamesxo'

const headers = {
	'authority': 'www.instagram.com',
	'accept': '*/*', 
	'accept-language': 'es-ES,es;q=0.5',
	'cache-control': 'no-cache', 
	'cookie': 'mid=Y90x1AAEAAGhPdBSi6h-PmP1Zgv8; ig_did=969410AC-6060-4DEA-B485-6E4667D4A2B1; datr=mxXxY2eFpgIOelyEw4jVATbp; ds_user_id=59200750713; dpr=0.8999999761581421; csrftoken=npQ0u7KJZM2CJVT5nmGJ4OPEHplAshpQ; shbid="2480\\05459200750713\\0541715697897:01f70d387c87ef0a81c0d0402fae4aad786a751b14b6a30743793e36d7e7833f3cc39f50"; shbts="1684161897\\05459200750713\\0541715697897:01f727f4466613b4c71002e519f1879f6c375565eff98d077506aef7c7d0c1ca373fa8d4"; sessionid=59200750713%3A6XpeRoFnRcOeLI%3A27%3AAYeQpsiw-G3ZPn56ws07Axgx0tagf8f6qhZaB5iFXA; rur="CLN\\05459200750713\\0541715806579:01f75a856a0fccd9cc1744695d6aab8e638f5e1aa2112c39fdd92da49a0038a343eb30d3"; csrftoken=bjxLMtPqxpDHpihtoBi2qu8DUDShcE4l; ds_user_id=59200750713; ig_did=10812A36-469F-4EBC-8FC6-E1C3589EDC79; mid=ZFKlAgAEAAFox0VvyhD4Ad8tPRXE',
	'pragma': 'no-cache', 
	'referer': 'https://www.instagram.com/alessandra_jamesxo/',
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
	'x-csrftoken': 'npQ0u7KJZM2CJVT5nmGJ4OPEHplAshpQ',
	'x-ig-app-id': '936619743392459', 
	'x-ig-www-claim': 'hmac.AR3gq4qvPq_uJ-zEKc1CKaRv4GtmoX1_0rcIgyFqh-Ta7V_I', 
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
