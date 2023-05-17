const USER = 617691

var axios = require('axios');
const Promise = require('bluebird');
const fs = require('fs-extra')
const wget = require('node-wget');
require('dotenv').config()

// const writeStream = fs.createWriteStream('wyylde.txt')

const headers = {
	'authority': 'www.wyylde.com',
	'accept': 'application/json, text/plain, */*',
	'accept-language': 'es-ES,es;q=0.9',
	'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGV0bSI6MTY4MzIwNTI5OCwiX19pZCI6IjQ3NzE1MDMiLCJfX25hbWUiOiJzb3BoaWVibG9uZGUiLCJfX3N0YXRlcyI6W10sInBhc3N3b3JkX3VwZGF0ZWQiOnsicGFzc3dvcmRfdXBkYXRlZF9kdCI6IjIwMjMtMDMtMzAgMDY6MTk6MjYifSwicmVmcmVzaHRtIjoxNjgzNTU3ODE0LCJ1cGRhdGV0bSI6MTY4MzU1NzgxNH0.jQLOqRnrIgH55rpGU0tb_Q3FSH1TOLvuOKokvx7fn9g',
	'cache-control': 'no-cache',
	'cookie': 'ajs_anonymous_id=49220e29-b51d-46f0-9ff2-39955a83dbd1; amplify-redirected-from-hosted-ui=true; CognitoIdentityServiceProvider.6ptdukvj0fsarcfavfq3822gvo.google_116102830886034533830.refreshToken=eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.ixS5ObTz0qARqbEj4Kalso1TxeVH8iHulCJbEhdwJZPtB46QgHqji18GS81p8vsf1uiG9v8ZkMjtsxDWnoS5V2n2fBtcTBE7V6qZLXXu8v-xHExIyCxamVJlhW7tCFjFvaGuiucKjQRAWYKbJaZkQzknTC0__aW51_ByPdmWM4dAZjuAhwIuFRMYd1-RbvCjXRVp8rZpeliqyuRNnNVr3VEjDYK06rDbFt7jnD70HUoPt8-FOSzk4-7WDAzsnlSZXqXLhaFK0cx_3Q65LtWpmi3B5fRFHx7NkCpgN_rq3B3HNvJM-nPMiYIXi37bvhhJ_GKSwy_vua2nqOHDJ1kh3g.054ok31Lf-CzY9Q2.y-kK0ApAtR9lT8QLwsGc67GL423aZEGOjiwTlyQplrRMXU5mYLIyMHQA0vUfW5HoWQhJskA74XFYAFotCP-Bn7mC4ded-qFSQWI6Cbue_A6YyGGzcywGVzENKWwKsmvnUEBThJ9DsFk5qknZ2NurdOXeaFgMDRb7DAdCO9Q0vmLUjnWRvH8dRcSWZc59Sn7CyELd9bPvekFiq3lxFWf_6bNPonajwbvxOVq_HpMywQMKPzNMfJE_Qha4NMfQgnixIfAP5wmySE4gG1_0KpSdNFVBqrA4VhY8KC_VKRWLIn8QDU6KlgrWZyyfe0HIhRVboqD4F653pUmELXGrQlbQ5iCjw-4DtnAxuTMZn3L31v_roOC6BSK0wyh0aJpRutHiSiu8YXKVF8Vfk90yV4f_O3W2hRWoqO0D5aLnrVZoUtKh45MNSBlIpONRqcdpyt379mnC8aHg1WVvDC1YTeDIYtP8yfTLguzs2SHaWe9DbcE_4mX1yQJJ4fkBDEGUruA21jpYPBDLRXEdH4woRbyCdNG_w3NDM18wIFk63rAlkGXa49HiGYfaziVPGrMmzxtbtud2FnCIr6mxXkXW3FDuDPHyI7imYQhYkfCA_B8NxaS1hpfGEGmAXBor1E5k4XHJ-g7lEhv8Fcwp3vOS0-rhN4BXrAw3H5Vw11hwxQRBuzF5B8Et2ulpfLzkfiXgBE2CIV_7IfawOnQjxaWirWry-Qy-aGTKn6-z6h7ZIRrAuBC_kOKSAsGs9R4MT8FBUFiiXeymjoLcZ-nW60ZMvW-BRpezubCv50rQUIKGd4PiY-cQ1D0Rr9eYmRB5rBc2dJAMK27ZiY_0mRT_OWhQ3FJpUqNkN0WvALqm8gNnz4mlMyoCpgm_IcoJ3vHuns18hoAuS2nI1-PEWW8QA7ViRNtnnj5iYKSjLFjCR3kUsqtYx_B0-oJb3YNIB8KT-yxhjswtAb7NDvvyyPAJEn6pYMA_QygpsvI_P6Ou8SudvSpZdXt85WGSWud1W4UTgwR6CS8ZLT4PJ8WtxwrhMhPCn-04C4Fm4VtJqBYWOtsXul59lyzv98NFc-H7Fi-3p_Ip7fjMc3fWiYkAEf2s4bh9E9uA96kje3BZJjC3-hrtui50Wvk7NarVRLsgFy1pbvzaoRsRiDz8pnbQrne1aabJwWmRYHcqAHiv-ZLeDgblOIwo7j_Nd32u5Q6Pgx5-SkOlVagWpz0NW3s53A.o1w1yQ9IABQ6U0S7DD9Nuw; CognitoIdentityServiceProvider.6ptdukvj0fsarcfavfq3822gvo.LastAuthUser=google_116102830886034533830; amplify-signin-with-hostedUI=true; CognitoIdentityServiceProvider.6ptdukvj0fsarcfavfq3822gvo.google_116102830886034533830.clockDrift=0; session_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGV0bSI6MTY4MzIwNTI5OCwiX19pZCI6IjQ3NzE1MDMiLCJfX25hbWUiOiJzb3BoaWVibG9uZGUiLCJfX3N0YXRlcyI6W10sInBhc3N3b3JkX3VwZGF0ZWQiOnsicGFzc3dvcmRfdXBkYXRlZF9kdCI6IjIwMjMtMDMtMzAgMDY6MTk6MjYifX0.J2P-wYk4yJpgTtraXZrZtuCcFly9gPMTQ8bgm8mOoYA; query_string=%7B%22travelId%22%3A%2298448000-f833-11ed-99c9-4b35961533fc%22%2C%22nocache%22%3A%221677670923822%22%2C%22lang%22%3A%22es_ES%22%2C%22token%22%3A%22eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjQ3NzE1MDMiLCJjcmVhdGVkIjoxNjgwMTU3MDcwfQ.c5wPndEALAjl7nlWgYkTjjLbKGL2EOeYR0qyjd6pRKc%22%2C%22social%22%3A%221%22%7D; CognitoIdentityServiceProvider.6ptdukvj0fsarcfavfq3822gvo.google_116102830886034533830.idToken=eyJraWQiOiJLcW8zSWNcL3hpdllteXFhWGhsTU4zT1Vla05FdnFcL1hYb3BvWVwvWEZDdFBNPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiN1YwV05NZ1JrWDV6MUpYU2MySTItdyIsInN1YiI6IjkyZjE2YjE1LWM0NjAtNGY4MC04OWIzLWEyZjhhYmUyNDYxZiIsImNvZ25pdG86Z3JvdXBzIjpbImV1LXdlc3QtMV8xNG1aQTdrWklfR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV8xNG1aQTdrWkkiLCJjb2duaXRvOnVzZXJuYW1lIjoiZ29vZ2xlXzExNjEwMjgzMDg4NjAzNDUzMzgzMCIsIm9yaWdpbl9qdGkiOiJiNGZmMDM5ZC1iNmU0LTQ5NTMtOWM0Ny1iY2Y5ZjliNmEzZjAiLCJhdWQiOiI2cHRkdWt2ajBmc2FyY2ZhdmZxMzgyMmd2byIsImlkZW50aXRpZXMiOlt7InVzZXJJZCI6IjExNjEwMjgzMDg4NjAzNDUzMzgzMCIsInByb3ZpZGVyTmFtZSI6Ikdvb2dsZSIsInByb3ZpZGVyVHlwZSI6Ikdvb2dsZSIsImlzc3VlciI6bnVsbCwicHJpbWFyeSI6InRydWUiLCJkYXRlQ3JlYXRlZCI6IjE2ODAxNTcyODk2NzkifV0sInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjgwMTU3Mjg5LCJleHAiOjE2ODM1NTkyMzQsImlhdCI6MTY4MzU1NTYzNCwianRpIjoiNjIwMTA4NmItY2M2Mi00OTgyLWI0ZTEtOTU4ZTcwYTBkY2VjIiwiZW1haWwiOiJzb3BoaWUubWFydGluczN4QGdtYWlsLmNvbSJ9.zxz59mYm9WBYAJzq6RRpE4ZqtqEXFCGd6bu0Ue-STpBTsw7pe1pcgZ9phh1VBNmAB64T1stBxMrpGSOQpDZwV7NitJjZ8SAQV2H_Cwg_O2gJzydZDzzJnrG9Fs102BBrK5dWgxGofyPIGMvL0ZBHbpy5ggGh22dcFeQwqt7c-8P0QTzmnXXyHMSLoC6rNC8uEQQ6H_h8PH3AokeNEsRUNfh_tPD_AvCOjwo_5WphFs40zqz5JYbqgODCFuotvQLF5I6ShUAv2MyDwo8icpwfwIdlCyKb1gDSuAy4BgtLYGNmLXrq6nGczI6zCAVQUuTiFnHvqOCKDuAAJt3s18d0dA; CognitoIdentityServiceProvider.6ptdukvj0fsarcfavfq3822gvo.google_116102830886034533830.accessToken=eyJraWQiOiJTRXdYelwvTlMwcFgxSUl3SnNXejk4MysrQTlIeWpHVk9BcFJzWVlWY01Ebz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5MmYxNmIxNS1jNDYwLTRmODAtODliMy1hMmY4YWJlMjQ2MWYiLCJjb2duaXRvOmdyb3VwcyI6WyJldS13ZXN0LTFfMTRtWkE3a1pJX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV8xNG1aQTdrWkkiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI2cHRkdWt2ajBmc2FyY2ZhdmZxMzgyMmd2byIsIm9yaWdpbl9qdGkiOiJiNGZmMDM5ZC1iNmU0LTQ5NTMtOWM0Ny1iY2Y5ZjliNmEzZjAiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6Im9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTY4MDE1NzI4OSwiZXhwIjoxNjgzNTU5MjM0LCJpYXQiOjE2ODM1NTU2MzQsImp0aSI6ImQ3ZDA3MzI0LTgyYmEtNGU1MC1iYzc3LWMxNTVkYWRkOTBiOCIsInVzZXJuYW1lIjoiZ29vZ2xlXzExNjEwMjgzMDg4NjAzNDUzMzgzMCJ9.QBoOfmeYjQegWFDvVL_waHWXkMOPM_Yj07YB0kWFPXhh96J2YgLE4Kv4iJTtmZMpwOD5TC4qaJ0oVOkzKaEtiIZ8PFTl4odGcwPXos6qOvSdK4sghTjV5wwdYqutZ4x-OQJOODqO_H1c4o4cXNsDWSftUPWgGU8UwsbSZG7xBolhZdVWESEYlXBp3sF_GvPrftMp7BrnBsQzHTtZjdQsTGTTbMf1l4_Kahh3wTbHW4TR7seoaQz99JgGqwDWiE2I-Y_t6TsNFjsvdl7ZtoPdPdAdc9N3gJAhMomH5_36CTEponV9-FChWRRH-A_BRuvsXbPO7ELoMGs5QOWIBPXDdQ; AWSALB=TrLSdL/qEpCjMoZ2Y6belpamkpukBD67e2x0F4hCTH1MSZAsG9Y1BoJwW2V2TLhueHIMrLgGNxJri8ScABLuH4bV3+xODbS6erEXVpAJufx4/mrtR6vc0H9XZDOs',
	'pragma': 'no-cache',
	'referer': 'https://www.wyylde.com/es-es/mediacenter/user/2603960/album',
	'sec-ch-ua': '"Brave";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
	'sec-ch-ua-mobile': '?0',
	'sec-ch-ua-platform': '"macOS"',
	'sec-fetch-dest': 'empty',
	'sec-fetch-mode': 'cors',
	'sec-fetch-site': 'same-origin',
	'sec-gpc': '1',
	'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
	'x-device': 'desktop',
	'x-version': '1683293019'
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

					const pictures = res.data.data.pictures
					const video = res.data.data.videos

					if (pictures) {
						pictures.map(items => {
							const full = items.full

							wget({
								url: full,
								dest: `./${url_id}/`,
								timeout: 6000
							})

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

	}, { concurrency })
} catch (err) {
	console.log("Error PRINCIPAL", err)
}
