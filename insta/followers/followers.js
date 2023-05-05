const axios = require('axios');
const fs = require('fs');

const userId = '235102399';
const userName = 'azskoot'

const headers = {
	'authority': 'www.instagram.com',
	'accept': '*/*',
	'accept-language': 'es-ES,es;q=0.6',
	'cache-control': 'no-cache',
	'cookie': 'mid=Y90x1AAEAAGhPdBSi6h-PmP1Zgv8; ig_did=969410AC-6060-4DEA-B485-6E4667D4A2B1; datr=mxXxY2eFpgIOelyEw4jVATbp; dpr=0.8999999761581421; shbid="1476\\054215206853\\0541714657250:01f7b9159cc96c5cc9be21ff972e4f4f7db6b627cab7cfdb6b9d60d6f44dea3c17413bcb"; shbts="1683121250\\054215206853\\0541714657250:01f777fc60139cdc485881ebb05e6a8695ae5bc2b88de5bbb416ff32381d4e584d4202bf"; csrftoken=HTA5nIBi8fYtvG3sR3dRZ3CS65IxO2UF; ds_user_id=59200750713; sessionid=59200750713%3AfFd9kF4T66MmzC%3A20%3AAYc0MTUsJiqeNNuTyHBTq9l73kIm2YF7W541sQ4XFA; rur="RVA\\05459200750713\\0541714810067:01f77da305a77e0a92f7310918d79736b56414cbbaaa409660ee07eafc384b0d8c5e5c21"; csrftoken=bjxLMtPqxpDHpihtoBi2qu8DUDShcE4l; ds_user_id=59200750713; ig_did=10812A36-469F-4EBC-8FC6-E1C3589EDC79; mid=ZFKlAgAEAAFox0VvyhD4Ad8tPRXE; rur="RVA\\05459200750713\\0541714810146:01f7bdc114eb9c11c1fb6de5c9ca7f7f62130812bb95c96f502862df07019e81d638787a"',
	'pragma': 'no-cache',
	'referer': 'https://www.instagram.com/lilytravelgirl/followers/',
	'sec-ch-ua': '"Chromium";v="112", "Brave";v="112", "Not:A-Brand";v="99"',
	'sec-ch-ua-mobile': '?0',
	'sec-ch-ua-platform': '"macOS"',
	'sec-fetch-dest': 'empty',
	'sec-fetch-mode': 'cors',
	'sec-fetch-site': 'same-origin',
	'sec-gpc': '1',
	'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
	'x-asbd-id': '198387',
	'x-csrftoken': 'HTA5nIBi8fYtvG3sR3dRZ3CS65IxO2UF',
	'x-ig-app-id': '936619743392459',
	'x-ig-www-claim': 'hmac.AR3gq4qvPq_uJ-zEKc1CKaRv4GtmoX1_0rcIgyFqh-Ta7fBd',
	'x-requested-with': 'XMLHttpRequest'
}

const getFollowers = async (userId) => {
	let idPost = ''
	let followers = [];
	let hasMore = true;

	while (hasMore) {
		const url = `https://www.instagram.com/api/v1/friendships/57574872944/followers/?count=32&max_id=${idPost}&search_surface=follow_list_page`;

		const res = await axios.get(url, { headers });

		console.log(url)

		const edges = res.data.users;
		idPost = res.data.next_max_id;
		followers = [...followers, ...edges];
		hasMore = res.data.big_list;

	}

	return (followers);
}

getFollowers(userId).then(posts => {
	fs.writeFileSync(`${userName}.json`, JSON.stringify(posts));

	console.log(`Se han obtenido ${posts.length} publicaciones del usuario ${userId}`);

})
	.catch(err => console.error(err));

