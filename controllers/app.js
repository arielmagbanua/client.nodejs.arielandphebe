const path = require('path');
const rootDir = require('../utils/path');
const axios = require('axios').default;

exports.getSocialTest = (req, res, next) => {
	const hashTag = req.params.hashTag;
	const requestUrl = `https://api.twitter.com/1.1/search/tweets.json?q=%23${hashTag}&result_type=recent`;

	return axios.get(requestUrl, {
		headers: {
			Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAMNTBwEAAAAAc6vCe0JAEXx2%2Fe3tbisYdsqPMIo%3D4ZLXPaAk7ZgYjVcmv0cmi6tC7xti3gwwh3X0ebDFA9ezg9zDCd'
		}
	})
		.then((tweets) => {
			// only accept tweets with retweeted_status is not defined
			let posts = tweets.data.statuses.filter((tweet) => {
				return typeof tweet.retweeted_status === 'undefined';
			});

			posts = posts.map((tweet) => {
				let media = [];

				if (tweet.entities.media) {
					media = tweet.entities.media.map((medium) => {
						return medium.media_url_https;
					});
				}

				return {
					id: tweet.id,
					text: tweet.text,
					media: media,
					user: {
						id: tweet.user.id,
						name: tweet.user.name,
						screenName: tweet.user.screen_name,
						profileImageUrl: tweet.user.profile_image_url_https,
						profileUrl: 'https://twitter.com/' + tweet.user.screen_name
					}
				}
			});

			return res.json(posts);
		});
};

exports.getIndex = (req, res, next) => {
	res.sendFile(path.join(rootDir, 'views', 'index.html'));
};

exports.getSocial = (req, res, next) => {
	res.sendFile(path.join(rootDir, 'dist', 'social.html'));
};
