const path = require('path');
const rootDir = require('../utils/path');

exports.getSocial = (req, res, next) => {
	res.sendFile(path.join(rootDir, 'views', 'simple-index.html'));
};

exports.getIndex = (req, res, next) => {
	res.sendFile(path.join(rootDir, 'views', 'index.html'));
};
