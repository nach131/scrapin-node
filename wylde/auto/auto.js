const USER = 617691

var axios = require('axios');
const Promise = require('bluebird');
const fs = require('fs-extra')
const wget = require('node-wget');
require('dotenv').config()

// const writeStream = fs.createWriteStream('wyylde.txt')

// 2670144
// 4277974
// 2508875
// 186563
// 31087
// 1959181
// 1918771
// 1964109
// 2174309
// 155922

const headers = {
	'authority': 'www.wyylde.com',
	'accept': 'application/json, text/plain, */*',
	'accept-language': 'es-ES,es;q=0.9', 
	'authorization': process.env.SECRET_KEY,
	'cache-control': 'no-cache', 
	'cookie': 'ajs_anonymous_id=49220e29-b51d-46f0-9ff2-39955a83dbd1; amplify-redirected-from-hosted-ui=true; CognitoIdentityServiceProvider.6ptdukvj0fsarcfavfq3822gvo.google_116102830886034533830.refreshToken=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.ixS5ObTz0qARqbEj4Kalso1TxeVH8iHulCJbEhdwJZPtB46QgHqji18GS81p8vsf1uiG9v8ZkMjtsxDWnoS5V2n2fBtcTBE7V6qZLXXu8v-xHExIyCxamVJlhW7tCFjFvaGuiucKjQRAWYKbJaZkQzknTC0__aW51_ByPdmWM4dAZjuAhwIuFRMYd1-RbvCjXRVp8rZpeliqyuRNnNVr3VEjDYK06rDbFt7jnD70HUoPt8-FOSzk4-7WDAzsnlSZXqXLhaFK0cx_3Q65LtWpmi3B5fRFHx7NkCpgN_rq3B3HNvJM-nPMiYIXi37bvhhJ_GKSwy_vua2nqOHDJ1kh3g.054ok31Lf-CzY9Q2.y-kK0ApAtR9lT8QLwsGc67GL423aZEGOjiwTlyQplrRMXU5mYLIyMHQA0vUfW5HoWQhJskA74XFYAFotCP-Bn7mC4ded-qFSQWI6Cbue_A6YyGGzcywGVzENKWwKsmvnUEBThJ9DsFk5qknZ2NurdOXeaFgMDRb7DAdCO9Q0vmLUjnWRvH8dRcSWZc59Sn7CyELd9bPvekFiq3lxFWf_6bNPonajwbvxOVq_HpMywQMKPzNMfJE_Qha4NMfQgnixIfAP5wmySE4gG1_0KpSdNFVBqrA4VhY8KC_VKRWLIn8QDU6KlgrWZyyfe0HIhRVboqD4F653pUmELXGrQlbQ5iCjw-4DtnAxuTMZn3L31v_roOC6BSK0wyh0aJpRutHiSiu8YXKVF8Vfk90yV4f_O3W2hRWoqO0D5aLnrVZoUtKh45MNSBlIpONRqcdpyt379mnC8aHg1WVvDC1YTeDIYtP8yfTLguzs2SHaWe9DbcE_4mX1yQJJ4fkBDEGUruA21jpYPBDLRXEdH4woRbyCdNG_w3NDM18wIFk63rAlkGXa49HiGYfaziVPGrMmzxtbtud2FnCIr6mxXkXW3FDuDPHyI7imYQhYkfCA_B8NxaS1hpfGEGmAXBor1E5k4XHJ-g7lEhv8Fcwp3vOS0-rhN4BXrAw3H5Vw11hwxQRBuzF5B8Et2ulpfLzkfiXgBE2CIV_7IfawOnQjxaWirWry-Qy-aGTKn6-z6h7ZIRrAuBC_kOKSAsGs9R4MT8FBUFiiXeymjoLcZ-nW60ZMvW-BRpezubCv50rQUIKGd4PiY-cQ1D0Rr9eYmRB5rBc2dJAMK27ZiY_0mRT_OWhQ3FJpUqNkN0WvALqm8gNnz4mlMyoCpgm_IcoJ3vHuns18hoAuS2nI1-PEWW8QA7ViRNtnnj5iYKSjLFjCR3kUsqtYx_B0-oJb3YNIB8KT-yxhjswtAb7NDvvyyPAJEn6pYMA_QygpsvI_P6Ou8SudvSpZdXt85WGSWud1W4UTgwR6CS8ZLT4PJ8WtxwrhMhPCn-04C4Fm4VtJqBYWOtsXul59lyzv98NFc-H7Fi-3p_Ip7fjMc3fWiYkAEf2s4bh9E9uA96kje3BZJjC3-hrtui50Wvk7NarVRLsgFy1pbvzaoRsRiDz8pnbQrne1aabJwWmRYHcqAHiv-ZLeDgblOIwo7j_Nd32u5Q6Pgx5-SkOlVagWpz0NW3s53A.o1w1yQ9IABQ6U0S7DD9Nuw; CognitoIdentityServiceProvider.6ptdukvj0fsarcfavfq3822gvo.LastAuthUser=google_116102830886034533830; amplify-signin-with-hostedUI=true; ajs_user_id=4771503; session_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGV0bSI6MTY4MTk5NDYyMSwiX19pZCI6IjQ3NzE1MDMiLCJfX25hbWUiOiJzb3BoaWVibG9uZGUiLCJfX3N0YXRlcyI6W10sInBhc3N3b3JkX3VwZGF0ZWQiOnsicGFzc3dvcmRfdXBkYXRlZF9kdCI6IjIwMjMtMDMtMzAgMDY6MTk6MjYifX0.ZfRe8fEZfqi2vxrBE8vFgl5OZxN3_uN8wsWvh7-ZqnQ; analytics_session_id=1681994622906; analytics_session_id.last_access=1681994622911; CognitoIdentityServiceProvider.6ptdukvj0fsarcfavfq3822gvo.google_116102830886034533830.clockDrift=0; query_string=%7B%22travelId%22%3A%2273f0c000-e48e-11ed-8ed8-278dbd1406d2%22%2C%22nocache%22%3A%221677670923822%22%2C%22lang%22%3A%22es_ES%22%2C%22token%22%3A%22eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjQ3NzE1MDMiLCJjcmVhdGVkIjoxNjgwMTU3MDcwfQ.c5wPndEALAjl7nlWgYkTjjLbKGL2EOeYR0qyjd6pRKc%22%2C%22social%22%3A%221%22%7D; CognitoIdentityServiceProvider.6ptdukvj0fsarcfavfq3822gvo.google_116102830886034533830.idToken=eyJraWQiOiJLcW8zSWNcL3hpdllteXFhWGhsTU4zT1Vla05FdnFcL1hYb3BvWVwvWEZDdFBNPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiZ0Zwazd5YkRpd1pvemtRd1Q1a1h3USIsInN1YiI6IjkyZjE2YjE1LWM0NjAtNGY4MC04OWIzLWEyZjhhYmUyNDYxZiIsImNvZ25pdG86Z3JvdXBzIjpbImV1LXdlc3QtMV8xNG1aQTdrWklfR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV8xNG1aQTdrWkkiLCJjb2duaXRvOnVzZXJuYW1lIjoiZ29vZ2xlXzExNjEwMjgzMDg4NjAzNDUzMzgzMCIsIm9yaWdpbl9qdGkiOiJiNGZmMDM5ZC1iNmU0LTQ5NTMtOWM0Ny1iY2Y5ZjliNmEzZjAiLCJhdWQiOiI2cHRkdWt2ajBmc2FyY2ZhdmZxMzgyMmd2byIsImlkZW50aXRpZXMiOlt7InVzZXJJZCI6IjExNjEwMjgzMDg4NjAzNDUzMzgzMCIsInByb3ZpZGVyTmFtZSI6Ikdvb2dsZSIsInByb3ZpZGVyVHlwZSI6Ikdvb2dsZSIsImlzc3VlciI6bnVsbCwicHJpbWFyeSI6InRydWUiLCJkYXRlQ3JlYXRlZCI6IjE2ODAxNTcyODk2NzkifV0sInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjgwMTU3Mjg5LCJleHAiOjE2ODI0NTc3NDIsImlhdCI6MTY4MjQ1NDE0MiwianRpIjoiMTJjODZiYzAtOWYzZi00ODc1LWI1ZmUtMWI1MTM3NmVhZmJhIiwiZW1haWwiOiJzb3BoaWUubWFydGluczN4QGdtYWlsLmNvbSJ9.W3I9j72Q_vKYNSxbjBFkCPiuz1jCkZ7QbAgOOEitiyGYzt1wQQITGyEC7IzVaoKwgF43inG96Q9U0c2CmO9PwdV-BcqPJ9KUDNSek09xFj4iQsZfIXkrc7peLQ23gYsoCfvVJt8XArh4jDxlgW2-bi8AfG0T-fhbmTfLI7QzV6LdfADIOkphnet80WdTdJPZLjpVEpKnNgZrGApjipAR7T4_UzM0Jwinz7iSCPG1a0EOvMxdJ_U_zDfY2XiAnslB1QMZnNk7zgC1z_RHbrrKk_7EBGMmUTIDKsmU9CWVOIDzpC4dz7tOyCTQe61SC26Q2YRGgmuJ8lDNpCCYUxjRWA; CognitoIdentityServiceProvider.6ptdukvj0fsarcfavfq3822gvo.google_116102830886034533830.accessToken=eyJraWQiOiJTRXdYelwvTlMwcFgxSUl3SnNXejk4MysrQTlIeWpHVk9BcFJzWVlWY01Ebz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5MmYxNmIxNS1jNDYwLTRmODAtODliMy1hMmY4YWJlMjQ2MWYiLCJjb2duaXRvOmdyb3VwcyI6WyJldS13ZXN0LTFfMTRtWkE3a1pJX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV8xNG1aQTdrWkkiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI2cHRkdWt2ajBmc2FyY2ZhdmZxMzgyMmd2byIsIm9yaWdpbl9qdGkiOiJiNGZmMDM5ZC1iNmU0LTQ5NTMtOWM0Ny1iY2Y5ZjliNmEzZjAiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6Im9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTY4MDE1NzI4OSwiZXhwIjoxNjgyNDU3NzQyLCJpYXQiOjE2ODI0NTQxNDIsImp0aSI6IjkxYzhmNzhmLTFhMzctNDdjMi1hYzY3LTFiMjFmN2MyMjBiOCIsInVzZXJuYW1lIjoiZ29vZ2xlXzExNjEwMjgzMDg4NjAzNDUzMzgzMCJ9.KkY5yTiyNSnlOu9MQSTKp2Ta80vXH__6Gmq2DJiGPJmVCxKvuB6dffPKcjHuJf1VBXVjOTTI7qQMXL8XjYmzh344-llW4qY0D3y_0rgOuThSByBrtWT09q9I_GIQR0gJv1kE1xRRlMg_uj1l2c2_xjVJ5JVuRhAmbbtwjRPALWt7RHfBCHlusmRW3XkILITrKg8QH7eY3ig0wbjwosAd6HH_LqATi4_F2cRgiVjwgnxdZOuIV723gWn7iEJcGnJCniYLadJO7PYUegR7kNoZCUnS_1vfcFGCkeHA62M1QOVZH8e84e-6GRdmvbSlC3dx8OeUPqpWDTatAgE1yNTNFw; AWSALB=7fvK2jD6HBy/DGMWwaDSfZ8Wb+tI7SMZhzRFWfcct4k45ZIGN9vuMCdqfkZ/6XiLnF86V7P4dSx7fwAF6Nb/FcxXBGk4jeL5WmWSadg0INW5uJhprbWdd6/cO1jH; AWSALB=svfaa2YNRxsiZek2ZJsKOmrNnTRcCLK8a+75SjAgbAnWG77vDSwXWe9/UQnol641MX/fNNRa+H9nTeMPjaChzlLtm0Nf9Mh/A8FVZF6iOcfsesA350BSzG3XfV/G; AWSALBCORS=svfaa2YNRxsiZek2ZJsKOmrNnTRcCLK8a+75SjAgbAnWG77vDSwXWe9/UQnol641MX/fNNRa+H9nTeMPjaChzlLtm0Nf9Mh/A8FVZF6iOcfsesA350BSzG3XfV/G',
	'pragma': 'no-cache', 
	'referer': 'https://www.wyylde.com/es-es/mediacenter/user/6133985/album/1239248684',
	'sec-ch-ua': '"Chromium";v="112", "Brave";v="112", "Not:A-Brand";v="99"',
	'sec-ch-ua-mobile': '?0',
	'sec-ch-ua-platform': '"macOS"',
	'sec-fetch-dest': 'empty',
	'sec-fetch-mode': 'cors',
	'sec-fetch-site': 'same-origin',
	'sec-gpc': '1', 
	'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
	'x-device': 'desktop', 
	'x-version': '1682423351'
}


var axios = Promise.promisifyAll(require('axios'))

var config = {
	method: 'get',
	url: `https://www.wyylde.com/rest/mc/${USER}/albums`,
	headers: headers
};

const albums = axios(config)
	.then(function (res) {

		const cero = {
			id: 0,
			url_id: '0',
			visibility: 'public',
		}
		res.data.data.albums.push(cero)

		// console.log(res.data.data.albums)
		return (res.data.data.albums)
	})
	.catch(function (error) {
		console.log("Error: Axios", error);
	});

// const albums = require('./wyylde.json')

let concurrency = 2 // numero máximo de peticiones

try {
	Promise.map(albums, item => {
		// console.log(item)
		const { url_id, title, visibility } = item

		fs.mkdir(url_id, (err) => {
			if (err) {
				return console.log("Error mkdir", err);
			}

			var config = {
				method: 'get',

				url: `https://www.wyylde.com/rest/mc/${USER}/album/${url_id}?nocache=1677227835635&version=4.1.0`,

				headers: headers

			}

			axios(config)
				.then(function (res) {

					// console.log(res.data.data.videos)
					const pictures = res.data.data.pictures
					const video = res.data.data.videos

					if (pictures) {
						pictures.map(items => {
							const full = items.full

							// console.log(full)
							// const after = full.split('?')[0]
							wget({
								url: full,
								dest: `./${url_id}/`,
								timeout: 6000
							})
							// console.log(full)

						}, function (err, data) {
							if (err) {
								console.log("Error Wget", err)
							} else {
								console.log(data)
							}
						})
					}
					else if (video) {
						video.map(items => {
							const play = items.play
							const after = play.split('?')[0]

							console.log(after)
							writeStream.write(`${after}\n`)
						})
					}
				})
				.catch(function (error) {
					console.log("Error Axios jpg", error);
				});

		});
		// console.log(id)

	}, { concurrency })
} catch (err) {
	console.log("Error PRINCIPAL", err)
}
