const axios = require('axios');

let config = {
	method: 'get',
	maxBodyLength: Infinity,
	url: 'https://twitter.com/i/api/graphql/qQoeS7szGavsi8-ehD2AWg/UserMedia?variables=%7B%22userId%22%3A%221620114211195203586%22%2C%22count%22%3A20%2C%22includePromotedContent%22%3Afalse%2C%22withClientEventToken%22%3Afalse%2C%22withBirdwatchNotes%22%3Afalse%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22rweb_lists_timeline_redesign_enabled%22%3Afalse%2C%22blue_business_profile_image_shape_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D',
	headers: {
		'authority': 'twitter.com',
		'accept': '*/*',
		'accept-language': 'es-ES,es;q=0.5',
		'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
		'cache-control': 'no-cache',
		'content-type': 'application/json',
		'cookie': 'lang=en; guest_id=v1%3A167964495504117530; kdt=igiaA24g51iNkyHbo5F6YFVw7ZTiKcBlHQRQoe8R; auth_token=a1e2bc88915c86b883cb7cfcfd8c146fd8706989; ct0=cba4fbdbaaf977149c2a4e3706e1bdb69216479c37446fba1212065eb0c02c2d4e27654e72197a1493950a091659c481853737a122e177fe5ad4f44a064e8893dea9d6c78a5e2bddc2de5630ebe4d81f; twid=u%3D1554218070385770499; dnt=1; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCNWY0AmIAToMY3NyZl9p%250AZCIlMjhhNjhjNjM4MGRmY2ZiZTcyMDlmZWFhMjQ1ZTA4NWY6B2lkIiVmNDky%250ANDU3YTkwYjJhZjJlMzFhMDk5NjEyMGJmMWQ4Zg%253D%253D--9594bcbe2a4cf186e3ab80ab789e821fe6900bd5; d_prefs=MToxLGNvbnNlbnRfdmVyc2lvbjoyLHRleHRfdmVyc2lvbjoxMDAw; guest_id_ads=v1%3A167964495504117530; guest_id_marketing=v1%3A167964495504117530; personalization_id="v1_Jv4EZ4AnsUhlZHOS0DN+AA=="; external_referer=padhuUp37zgIqv4rbNGbGesek%2FX3CXiA|0|8e8t2xd8A2w%3D; at_check=true; _ga=GA1.2.1250409188.1684360273; _gid=GA1.2.1198383541.1684360273; des_opt_in=Y; eu_cn=Y',
		'pragma': 'no-cache',
		'referer': 'https://twitter.com/kitty_baby_k/media',
		'sec-ch-ua': '"Brave";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"macOS"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-origin',
		'sec-gpc': '1',
		'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
		'x-client-uuid': '9b633c83-b03d-4e15-841b-e6f3c078c647',
		'x-csrf-token': 'cba4fbdbaaf977149c2a4e3706e1bdb69216479c37446fba1212065eb0c02c2d4e27654e72197a1493950a091659c481853737a122e177fe5ad4f44a064e8893dea9d6c78a5e2bddc2de5630ebe4d81f',
		'x-twitter-active-user': 'yes',
		'x-twitter-auth-type': 'OAuth2Session',
		'x-twitter-client-language': 'en'
	}
};

axios.request(config)
	.then((response) => {
		console.log(JSON.stringify(response.data));
	})
	.catch((error) => {
		console.log(error);
	});
