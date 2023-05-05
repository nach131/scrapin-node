
var axios = require('axios');
const Promise = require('bluebird');
const fs = require('fs-extra')
const wget = require('node-wget');
require('dotenv').config()

const writeStream = fs.createWriteStream('insta.json')

const headers = {
	'authority': 'www.instagram.com',
	'accept': '*/*',
	'accept-language': 'es-ES,es;q=0.6',
	'cache-control': 'no-cache',
	'cookie': 'mid=Y90x1AAEAAGhPdBSi6h-PmP1Zgv8; ig_did=969410AC-6060-4DEA-B485-6E4667D4A2B1; csrftoken=bjxLMtPqxpDHpihtoBi2qu8DUDShcE4l; ds_user_id=215206853; datr=mxXxY2eFpgIOelyEw4jVATbp; dpr=0.8999999761581421; shbid="1476\\054215206853\\0541714657250:01f7b9159cc96c5cc9be21ff972e4f4f7db6b627cab7cfdb6b9d60d6f44dea3c17413bcb"; shbts="1683121250\\054215206853\\0541714657250:01f777fc60139cdc485881ebb05e6a8695ae5bc2b88de5bbb416ff32381d4e584d4202bf"; sessionid=215206853%3A7eGgup4rPC71gx%3A2%3AAYd3GePerGW2zzzCj6Moo74885KNXxT1YCWEemN7g2A; rur="CLN\\054215206853\\0541714660534:01f79c7ef2e267f8d36548083e41a135fea4fcbf90db0520983b23cb686a0399680fad99"; csrftoken=bjxLMtPqxpDHpihtoBi2qu8DUDShcE4l; ds_user_id=215206853; rur="CLN\\054215206853\\0541714661646:01f782a50b356f2f1b6990559b72721d68daae0775037721bedcb68d7850d2d21e67a8e8"',
	'pragma': 'no-cache',
	'referer': 'https://www.instagram.com/elisa_dreams_fr/',
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
	'x-ig-www-claim': 'hmac.AR0HHh_LEWfDCEY2atBUL3SOzYLTH885yfMFWuNR0pDXkpCf',
	'x-requested-with': 'XMLHttpRequest'
}


var axios = Promise.promisifyAll(require('axios'))

var config = {
	method: 'get',
	// url: 'https://www.instagram.com/api/v1/feed/user/nadiavilesgarcia/username/?count=200',
	url: 'https://www.instagram.com/api/v1/feed/user/elisa_dreams_fr/username/?count=32',
	headers: headers
};

axios(config)
	.then((res) => {
		// console.log(JSON.stringify(res.data));
		writeStream.write(JSON.stringify(res.data.items));
		// console.log(JSON.stringify(res.data.items[1]));
		// console.log(res.data.items[0].image_versions2.candidates[0].url);
		// console.log(res.data.items[0].image_versions2.candidates);
		// console.log(res.data.items[31].carousel_media[0].image_versions2.candidates[0].url);
		// console.log(res.data.items[32].image_versions2.candidates[0].url);
	})
	.catch((error) => {
		console.log(error);
	});
