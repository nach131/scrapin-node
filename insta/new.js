const axios = require('axios');
const fs = require('fs');

const instagramData = {
	"taken_at": 1656501865,
	"pk": "2871268210985466425",
	"id": "2871268210985466425_44117456853",
	"device_timestamp": 1656501816779376,
	"media_type": 1,
	"code": "CfYyzmqqPo5",
	"client_cache_key": "Mjg3MTI2ODIxMDk4NTQ2NjQyNQ==.2",
	"filter_type": 0,
	"is_unified_video": false,
	"should_request_ads": false,
	"commerciality_status": "not_commercial",
	"is_visual_reply_commenter_notice_enabled": false,
	"clips_tab_pinned_user_ids": [],
	"comment_inform_treatment": {
		"should_have_inform_treatment": false,
		"text": "",
		"url": null,
		"action_type": null
	},
	"sharing_friction_info": {
		"should_have_sharing_friction": false,
		"bloks_app_url": null,
		"sharing_friction_payload": null
	},
	"timeline_pinned_user_ids": [
		44117456853
	],
	"caption_is_edited": false,
	"is_paid_partnership": false,
	"has_delayed_metadata": false,
	"comment_likes_enabled": true,
	"comment_threading_enabled": true,
	"max_num_visible_preview_comments": 2,
	"has_more_comments": true,
	"preview_comments": [],
	"comments": [],
	"comment_count": 76,
	"can_view_more_preview_comments": false,
	"hide_view_all_comment_entrypoint": false,
	"inline_composer_display_condition": "impression_trigger",
	"user": {
		"has_anonymous_profile_picture": false,
		"fan_club_info": {
			"fan_club_id": null,
			"fan_club_name": null,
			"is_fan_club_referral_eligible": null,
			"fan_consideration_page_revamp_eligiblity": null,
			"is_fan_club_gifting_eligible": null,
			"subscriber_count": null,
			"connected_member_count": null
		},
		"fbid_v2": "17841443945614682",
		"transparency_product_enabled": false,
		"is_favorite": false,
		"is_unpublished": false,
		"pk": "44117456853",
		"pk_id": "44117456853",
		"strong_id__": "44117456853",
		"username": "elisa_dreams_fr",
		"full_name": "Elisa modèle",
		"is_private": false,
		"is_verified": false,
		"profile_pic_id": "2438676555692375166_44117456853",
		"profile_pic_url": "https://instagram.fbcn4-1.fna.fbcdn.net/v/t51.2885-19/124245286_132111794993573_4818736852300933070_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fbcn4-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=V1lRTTE39ZAAX-wXM0E&edm=ABmJApABAAAA&ccb=7-5&oh=00_AfA_D8QaH5yPDVTVYN2VScYLlFkkpe0AutExR8rrhXwNcw&oe=6458A681&_nc_sid=6136e7",
		"account_badges": [],
		"show_account_transparency_details": true,
		"third_party_downloads_enabled": 0,
		"latest_reel_media": 1683191312
	},
	"can_viewer_reshare": true,
	"has_liked": false,
	"like_count": 961,
	"top_likers": [],
	"facepile_top_likers": [],
	"image_versions2": {
		"candidates": [
			{
				"width": 1440,
				"height": 1440,
				"url": "https://instagram.fbcn4-2.fna.fbcdn.net/v/t51.2885-15/290261290_7684023748336523_6661143835390308996_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fbcn4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=fqHItICrIGAAX9YL3bA&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjg3MTI2ODIxMDk4NTQ2NjQyNQ%3D%3D.2-ccb7-5&oh=00_AfCoB7T8C4s5j6SVDUzu3-J9LCSOe3vOAqUNNlbgRYl8mw&oe=6459B13C&_nc_sid=6136e7"
			},
			{
				"width": 1080,
				"height": 1080,
				"url": "https://instagram.fbcn4-2.fna.fbcdn.net/v/t51.2885-15/290261290_7684023748336523_6661143835390308996_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fbcn4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=fqHItICrIGAAX9YL3bA&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjg3MTI2ODIxMDk4NTQ2NjQyNQ%3D%3D.2-ccb7-5&oh=00_AfBmRA7szXrUW08Ts0kP9nMQYEmuVB9oY1dF9WIeLsfgwA&oe=6459B13C&_nc_sid=6136e7"
			},
			{
				"width": 720,
				"height": 720,
				"url": "https://instagram.fbcn4-2.fna.fbcdn.net/v/t51.2885-15/290261290_7684023748336523_6661143835390308996_n.jpg?stp=dst-jpg_e35_s720x720&_nc_ht=instagram.fbcn4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=fqHItICrIGAAX9YL3bA&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjg3MTI2ODIxMDk4NTQ2NjQyNQ%3D%3D.2-ccb7-5&oh=00_AfDSLoqKQ8Rm87ziF27qefGnuAdT6YX5g_HjBoVTG_sZOg&oe=6459B13C&_nc_sid=6136e7"
			},
			{
				"width": 640,
				"height": 640,
				"url": "https://instagram.fbcn4-2.fna.fbcdn.net/v/t51.2885-15/290261290_7684023748336523_6661143835390308996_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=instagram.fbcn4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=fqHItICrIGAAX9YL3bA&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjg3MTI2ODIxMDk4NTQ2NjQyNQ%3D%3D.2-ccb7-5&oh=00_AfBmI_Qw--70lI26h50o2fUnxiDY-ZApiQZV2M20XJmfuA&oe=6459B13C&_nc_sid=6136e7"
			},
			{
				"width": 480,
				"height": 480,
				"url": "https://instagram.fbcn4-2.fna.fbcdn.net/v/t51.2885-15/290261290_7684023748336523_6661143835390308996_n.jpg?stp=dst-jpg_e35_s480x480&_nc_ht=instagram.fbcn4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=fqHItICrIGAAX9YL3bA&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjg3MTI2ODIxMDk4NTQ2NjQyNQ%3D%3D.2-ccb7-5&oh=00_AfDcRUlQi9Gne0vluYJgq2JiBVWkReDxmODMLd9OyHd0oQ&oe=6459B13C&_nc_sid=6136e7"
			},
			{
				"width": 320,
				"height": 320,
				"url": "https://instagram.fbcn4-2.fna.fbcdn.net/v/t51.2885-15/290261290_7684023748336523_6661143835390308996_n.jpg?stp=dst-jpg_e35_s320x320&_nc_ht=instagram.fbcn4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=fqHItICrIGAAX9YL3bA&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjg3MTI2ODIxMDk4NTQ2NjQyNQ%3D%3D.2-ccb7-5&oh=00_AfALGqxneuFXQ6A6OfrfKa7YIsT5o6MdNDcB3B6_QAxWiw&oe=6459B13C&_nc_sid=6136e7"
			},
			{
				"width": 240,
				"height": 240,
				"url": "https://instagram.fbcn4-2.fna.fbcdn.net/v/t51.2885-15/290261290_7684023748336523_6661143835390308996_n.jpg?stp=dst-jpg_e35_s240x240&_nc_ht=instagram.fbcn4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=fqHItICrIGAAX9YL3bA&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjg3MTI2ODIxMDk4NTQ2NjQyNQ%3D%3D.2-ccb7-5&oh=00_AfClBE53W17glP09hqYR9-mg0AQF8BENc4_TeI7fdYH2rw&oe=6459B13C&_nc_sid=6136e7"
			},
			{
				"width": 1080,
				"height": 1080,
				"url": "https://instagram.fbcn4-2.fna.fbcdn.net/v/t51.2885-15/290261290_7684023748336523_6661143835390308996_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fbcn4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=fqHItICrIGAAX9YL3bA&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjg3MTI2ODIxMDk4NTQ2NjQyNQ%3D%3D.2-ccb7-5&oh=00_AfBmRA7szXrUW08Ts0kP9nMQYEmuVB9oY1dF9WIeLsfgwA&oe=6459B13C&_nc_sid=6136e7"
			},
			{
				"width": 750,
				"height": 750,
				"url": "https://instagram.fbcn4-2.fna.fbcdn.net/v/t51.2885-15/290261290_7684023748336523_6661143835390308996_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&_nc_ht=instagram.fbcn4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=fqHItICrIGAAX9YL3bA&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjg3MTI2ODIxMDk4NTQ2NjQyNQ%3D%3D.2-ccb7-5&oh=00_AfBiEZoN9VnKbNXirvy55dWAKUXk3h5NjPl9WfHbvvM3ig&oe=6459B13C&_nc_sid=6136e7"
			},
			{
				"width": 640,
				"height": 640,
				"url": "https://instagram.fbcn4-2.fna.fbcdn.net/v/t51.2885-15/290261290_7684023748336523_6661143835390308996_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=instagram.fbcn4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=fqHItICrIGAAX9YL3bA&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjg3MTI2ODIxMDk4NTQ2NjQyNQ%3D%3D.2-ccb7-5&oh=00_AfBmI_Qw--70lI26h50o2fUnxiDY-ZApiQZV2M20XJmfuA&oe=6459B13C&_nc_sid=6136e7"
			},
			{
				"width": 480,
				"height": 480,
				"url": "https://instagram.fbcn4-2.fna.fbcdn.net/v/t51.2885-15/290261290_7684023748336523_6661143835390308996_n.jpg?stp=dst-jpg_e35_s480x480&_nc_ht=instagram.fbcn4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=fqHItICrIGAAX9YL3bA&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjg3MTI2ODIxMDk4NTQ2NjQyNQ%3D%3D.2-ccb7-5&oh=00_AfDcRUlQi9Gne0vluYJgq2JiBVWkReDxmODMLd9OyHd0oQ&oe=6459B13C&_nc_sid=6136e7"
			},
			{
				"width": 320,
				"height": 320,
				"url": "https://instagram.fbcn4-2.fna.fbcdn.net/v/t51.2885-15/290261290_7684023748336523_6661143835390308996_n.jpg?stp=dst-jpg_e35_s320x320&_nc_ht=instagram.fbcn4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=fqHItICrIGAAX9YL3bA&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjg3MTI2ODIxMDk4NTQ2NjQyNQ%3D%3D.2-ccb7-5&oh=00_AfALGqxneuFXQ6A6OfrfKa7YIsT5o6MdNDcB3B6_QAxWiw&oe=6459B13C&_nc_sid=6136e7"
			},
			{
				"width": 240,
				"height": 240,
				"url": "https://instagram.fbcn4-2.fna.fbcdn.net/v/t51.2885-15/290261290_7684023748336523_6661143835390308996_n.jpg?stp=dst-jpg_e35_s240x240&_nc_ht=instagram.fbcn4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=fqHItICrIGAAX9YL3bA&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjg3MTI2ODIxMDk4NTQ2NjQyNQ%3D%3D.2-ccb7-5&oh=00_AfClBE53W17glP09hqYR9-mg0AQF8BENc4_TeI7fdYH2rw&oe=6459B13C&_nc_sid=6136e7"
			},
			{
				"width": 150,
				"height": 150,
				"url": "https://instagram.fbcn4-2.fna.fbcdn.net/v/t51.2885-15/290261290_7684023748336523_6661143835390308996_n.jpg?stp=dst-jpg_e35_s150x150&_nc_ht=instagram.fbcn4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=fqHItICrIGAAX9YL3bA&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjg3MTI2ODIxMDk4NTQ2NjQyNQ%3D%3D.2-ccb7-5&oh=00_AfCAx-tau7acxVn-mXS3WvAHVWx2v5UWBmTmVdTWm6clIg&oe=6459B13C&_nc_sid=6136e7"
			}
		]
	},
	"original_width": 1440,
	"original_height": 1440,
	"is_organic_product_tagging_eligible": false,
	"can_see_insights_as_brand": false,
	"caption": {
		"pk": "17982371671548594",
		"user_id": "44117456853",
		"text": "Bon mercredi à vous tous les coquins 😍😍😍\nJ’adore cette lingerie ❤️",
		"type": 1,
		"created_at": 1656501867,
		"created_at_utc": 1656501867,
		"content_type": "comment",
		"status": "Active",
		"bit_flags": 0,
		"did_report_as_spam": false,
		"share_enabled": false,
		"user": {
			"has_anonymous_profile_picture": false,
			"fan_club_info": {
				"fan_club_id": null,
				"fan_club_name": null,
				"is_fan_club_referral_eligible": null,
				"fan_consideration_page_revamp_eligiblity": null,
				"is_fan_club_gifting_eligible": null,
				"subscriber_count": null,
				"connected_member_count": null
			},
			"fbid_v2": "17841443945614682",
			"transparency_product_enabled": false,
			"is_favorite": false,
			"is_unpublished": false,
			"pk": "44117456853",
			"pk_id": "44117456853",
			"strong_id__": "44117456853",
			"username": "elisa_dreams_fr",
			"full_name": "Elisa modèle",
			"is_private": false,
			"is_verified": false,
			"profile_pic_id": "2438676555692375166_44117456853",
			"profile_pic_url": "https://instagram.fbcn4-1.fna.fbcdn.net/v/t51.2885-19/124245286_132111794993573_4818736852300933070_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fbcn4-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=V1lRTTE39ZAAX-wXM0E&edm=ABmJApABAAAA&ccb=7-5&oh=00_AfA_D8QaH5yPDVTVYN2VScYLlFkkpe0AutExR8rrhXwNcw&oe=6458A681&_nc_sid=6136e7",
			"account_badges": [],
			"show_account_transparency_details": true,
			"third_party_downloads_enabled": 0,
			"latest_reel_media": 1683191312
		},
		"is_covered": false,
		"is_ranked_comment": false,
		"media_id": "2871268210985466425",
		"has_translation": true,
		"private_reply_status": 0
	},
	"accessibility_caption": "Photo by Elisa modèle on June 29, 2022.",
	"original_media_has_visual_reply_media": false,
	"like_and_view_counts_disabled": false,
	"can_viewer_save": true,
	"is_in_profile_grid": false,
	"profile_grid_control_enabled": false,
	"featured_products": [],
	"is_comments_gif_composer_enabled": true,
	"attribution": null,
	"organic_tracking_token": "eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjpmYWxzZSwidXVpZCI6IjZkMjI1ZTg4Y2M1MjQ1ZGU4YzViZTJlOGE2Mzg2ZGE5Mjg3MTI2ODIxMDk4NTQ2NjQyNSIsInNlcnZlcl90b2tlbiI6IjE2ODMyMTYzODg0NTR8Mjg3MTI2ODIxMDk4NTQ2NjQyNXwyMTUyMDY4NTN8OWRkZjFlODhjMGM3ZTBlNTgwZjM1NGZlNmVmNTllZmY4Y2U2ZTU2MzRmZTIyMGYzOGIxMGNlMGYxMmU5OGRiOCJ9LCJzaWduYXR1cmUiOiIifQ==",
	"has_shared_to_fb": 0,
	"product_type": "feed",
	"show_shop_entrypoint": false,
	"deleted_reason": 0,
	"integrity_review_decision": "pending",
	"commerce_integrity_review_decision": null,
	"music_metadata": {
		"music_canonical_id": "0",
		"audio_type": null,
		"music_info": null,
		"original_sound_info": null,
		"pinned_media_ids": null
	},
	"ig_media_sharing_disabled": false,
	"explore_hide_comments": false
}
// console.log(json.image_versions2.candidates[0].url)

// Selecciona la imagen con una resolución de 1440x1440
const desiredImage = instagramData.image_versions2.candidates.find(image => image.width === 1440 && image.height === 1440);

// Descarga la imagen usando axios
axios.get(desiredImage.url, { responseType: 'stream' })
	.then(response => {
		const writer = fs.createWriteStream('image.jpg'); // Escribir el archivo en el sistema de archivos
		response.data.pipe(writer);
	})
	.catch(error => {
		console.log(error);
	});