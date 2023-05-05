const axios = require('axios');
const fs = require('fs');

const userId = '427553890';
const userName = 'leomessi'

const headers = {
	'authority': 'www.instagram.com',
	'accept': '*/*',
	'accept-language': 'es-ES,es;q=0.6',
	'cache-control': 'no-cache',
	'cookie': 'mid=Y90x1AAEAAGhPdBSi6h-PmP1Zgv8; ig_did=969410AC-6060-4DEA-B485-6E4667D4A2B1; csrftoken=bjxLMtPqxpDHpihtoBi2qu8DUDShcE4l; ds_user_id=215206853; datr=mxXxY2eFpgIOelyEw4jVATbp; dpr=0.8999999761581421; shbid="1476\\054215206853\\0541714657250:01f7b9159cc96c5cc9be21ff972e4f4f7db6b627cab7cfdb6b9d60d6f44dea3c17413bcb"; shbts="1683121250\\054215206853\\0541714657250:01f777fc60139cdc485881ebb05e6a8695ae5bc2b88de5bbb416ff32381d4e584d4202bf"; sessionid=215206853%3A7eGgup4rPC71gx%3A2%3AAYcTvrJuJivXHasp1MESejdga8A6IJ4xEYXEL27FoRQ; rur="CLN\\054215206853\\0541714683748:01f714ed047550fdd4b2e021b720622790b0b9db9db64f04a9daf3f83bf80c6a92ceefe6"; csrftoken=bjxLMtPqxpDHpihtoBi2qu8DUDShcE4l; ds_user_id=215206853; ig_did=10812A36-469F-4EBC-8FC6-E1C3589EDC79; mid=ZFKlAgAEAAFox0VvyhD4Ad8tPRXE; rur="CLN\\054215206853\\0541714747347:01f7b28fffa69e6f7b31c0407150b20c3aa2f222d0c3360ced7caa3e40c950ac0f979551"',
	'pragma': 'no-cache',
	'referer': 'https://www.instagram.com/ellisa.love/',
	'sec-ch-ua': '"Chromium";v="112", "Brave";v="112", "Not:A-Brand";v="99"',
	'sec-ch-ua-mobile': '?0',
	'sec-ch-ua-platform': '"macOS"',
	'sec-fetch-dest': 'empty',
	'sec-fetch-mode': 'cors',
	'sec-fetch-site': 'same-origin',
	'sec-gpc': '1',
	'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
	'x-asbd-id': '198387',
	'x-csrftoken': 'bjxLMtPqxpDHpihtoBi2qu8DUDShcE4l',
	'x-ig-app-id': '936619743392459',
	'x-ig-www-claim': 'hmac.AR0HHh_LEWfDCEY2atBUL3SOzYLTH885yfMFWuNR0pDXku0d',
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
