const axios = require('axios');
const fs = require('fs');
const writeStream = fs.createWriteStream('download.txt')

// const user_id = '1475191144434778118'
// const user_id = '850537199938420736'

// let config = {
//   method: 'get',
//   maxBodyLength: Infinity,
//   url: `https://twitter.com/i/api/graphql/EnIWTNQ8Tum-7t1NnZHOEQ/UserMedia?variables=%7B%22userId%22%3A%22${user_id}%22%2C%22count%22%3A20%2C%22includePromotedContent%22%3Afalse%2C%22withClientEventToken%22%3Afalse%2C%22withBirdwatchNotes%22%3Afalse%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`,
//   headers: {
//     // 'Referer': 'https://twitter.com/flirtyfitblonde/media',
//     'x-csrf-token': '245061095fdf3482d47f5f24ad9334ec00da7636e6890e7f3a000b0b6f20248e9e5e00ada3426904b0816be2b91a12a3ae4e7d133571db9264808ae650925dc02d091d2c0a72a7dc0b6c09c3b6f44d24',
//     'x-client-transaction-id': 'WHp40Peqk5QWy5Lndt01vYqFTAbhJ9Izt1rD8B6DKwsVpRP8ezSqozwymbK/V3LtmKUIylk3OwnIalCwBsHRVHlIESIpWQ',
//     'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
//     'Cookie': 'guest_id=v1%3A170887574959886056; g_state={"i_l":0}; kdt=dChAMWGflsu4NI6MEtR3aOTo9mrhSdCGENDHeuRS; twid=u%3D1554218070385770499; ct0=245061095fdf3482d47f5f24ad9334ec00da7636e6890e7f3a000b0b6f20248e9e5e00ada3426904b0816be2b91a12a3ae4e7d133571db9264808ae650925dc02d091d2c0a72a7dc0b6c09c3b6f44d24; auth_token=3c811e91fb0ce1a6c8ddea582186da61ef99534b; d_prefs=MToxLGNvbnNlbnRfdmVyc2lvbjoyLHRleHRfdmVyc2lvbjoxMDAw; guest_id_ads=v1%3A170887574959886056; guest_id_marketing=v1%3A170887574959886056; personalization_id="v1_td8WgZrhzHaFL2NQC3K2EA=="; dnt=1; lang=en; ct0=f9d6487328204b54f2a272a917d81d7483e2823f27a8a9677343050fa210436d7ce75c20aeb8b78a9130b175e7d6c1d2385ae164c2c56804e5d760e76fedb25810703af9e873be2c3fa38690e41c71ee'
//   }
// };



let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://twitter.com/i/api/graphql/EnIWTNQ8Tum-7t1NnZHOEQ/UserMedia?variables=%7B%22userId%22%3A%221475191144434778118%22%2C%22count%22%3A20%2C%22cursor%22%3A%22DAABCgABGHl5eFb___cKAAIX_01PZdrRtwgAAwAAAAIAAA%22%2C%22includePromotedContent%22%3Afalse%2C%22withClientEventToken%22%3Afalse%2C%22withBirdwatchNotes%22%3Afalse%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:123.0) Gecko/20100101 Firefox/123.0',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Referer': 'https://twitter.com/LaLady_xoxo/media',
    'content-type': 'application/json',
    'X-Client-UUID': '95cf296e-2f84-432a-bd5a-e9fdd5b14802',
    'x-twitter-auth-type': 'OAuth2Session',
    'x-csrf-token': '245061095fdf3482d47f5f24ad9334ec00da7636e6890e7f3a000b0b6f20248e9e5e00ada3426904b0816be2b91a12a3ae4e7d133571db9264808ae650925dc02d091d2c0a72a7dc0b6c09c3b6f44d24',
    'x-twitter-client-language': 'en',
    'x-twitter-active-user': 'yes',
    'x-client-transaction-id': '6sEv6GRIajqJOpB/gjxmfkqGycLfEJ2pLXXQon68SM1QHMlbrsUrwCRZHZw+V9wG/4NveOvGgkgfYsfihOvUrInGlKBe6w',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
    'Connection': 'keep-alive',
    'Cookie': 'guest_id=v1%3A170887574959886056; g_state={"i_l":0}; kdt=dChAMWGflsu4NI6MEtR3aOTo9mrhSdCGENDHeuRS; twid=u%3D1554218070385770499; ct0=245061095fdf3482d47f5f24ad9334ec00da7636e6890e7f3a000b0b6f20248e9e5e00ada3426904b0816be2b91a12a3ae4e7d133571db9264808ae650925dc02d091d2c0a72a7dc0b6c09c3b6f44d24; auth_token=3c811e91fb0ce1a6c8ddea582186da61ef99534b; d_prefs=MToxLGNvbnNlbnRfdmVyc2lvbjoyLHRleHRfdmVyc2lvbjoxMDAw; guest_id_ads=v1%3A170887574959886056; guest_id_marketing=v1%3A170887574959886056; personalization_id="v1_td8WgZrhzHaFL2NQC3K2EA=="; dnt=1; lang=en; ct0=f9d6487328204b54f2a272a917d81d7483e2823f27a8a9677343050fa210436d7ce75c20aeb8b78a9130b175e7d6c1d2385ae164c2c56804e5d760e76fedb25810703af9e873be2c3fa38690e41c71ee',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'TE': 'trailers'
  }
};

axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });




// axios.request(config)
//   .then((response) => {

//     // const media = response.data.data.user.result.timeline_v2.timeline.instructions[2].entries[0].content

//     console.log(response.data)

//     // media.items.forEach(items => {

//     //   // console.log(items.item.itemContent.tweet_results.result.legacy.entities.media[0].id_str)

//     //   const cositas = items.item.itemContent.tweet_results.result.legacy.entities.media[0].media_url_https
//     //   writeStream.write(`${cositas}\n`)

//     //   console.log(cositas)

//     // })

//   })
//   .catch((error) => {
//     console.log(error);
//   });





// // Cargar el contenido del archivo JSON
// fs.readFile('res.json', 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error al leer el archivo:', err);
//     return;
//   }

//   try {
//     // Analizar el contenido JSON en un objeto
//     const jsonData = JSON.parse(data);

//     const media = jsonData.data.user.result.timeline_v2.timeline.instructions[2].entries[0].content

//     media.items.forEach(items => {


//       // console.log(items.item.itemContent.tweet_results.result.legacy.entities.media[0].id_str)

//       const cositas = items.item.itemContent.tweet_results.result.legacy.entities.media[0].media_url_https
//       writeStream.write(`${cositas}\n`)

//       console.log(cositas)

//     })


//   } catch (error) {
//     console.error('Error al analizar el JSON:', error);
//   }
// });
