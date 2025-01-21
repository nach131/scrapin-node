const url = require('url');

const urlString = 'https://twitter.com/i/api/graphql/7_ZP_xN3Bcq1I2QkK5yc2w/UserMedia?variables=%7B%22userId%22%3A%221425852910961897473%22%2C%22count%22%3A100%2C%22includePromotedContent%22%3Afalse%2C%22withClientEventToken%22%3Afalse%2C%22withBirdwatchNotes%22%3Afalse%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22responsive_web_home_pinned_timelines_enabled%22%3Atrue%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Afalse%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_media_download_video_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D';

const parsedUrl = url.parse(urlString, true);

console.log('Protocolo:', parsedUrl.protocol);
console.log('Dominio:', parsedUrl.host);
console.log('Ruta:', parsedUrl.pathname);
console.log('Parámetros de consulta:', parsedUrl.query);


// parsedUrl.query.variables.userId = 'nuevo_valor';

// // Reconstruir la URL con los nuevos parámetros
// const nuevaUrl = url.format({
//     protocol: parsedUrl.protocol,
//     host: parsedUrl.host,
//     pathname: parsedUrl.pathname,
//     query: parsedUrl.query
// });

// console.log('Nueva URL:', nuevaUrl);
