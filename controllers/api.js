const fetch = require('node-fetch');

exports.postSendRSVP = (req, res, next) => {
	const name = req.body.name;
	const email = req.body.email;
	const attendance = req.body.attendance == 'yes';
	const note = req.body.note;

	const payloadBody = JSON.stringify({ name, email, attendance, note });
	console.log(payloadBody);

	fetch('https://asia-east2-arielandphebe.cloudfunctions.net/rsvp/add', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: payloadBody
	}).then((response) => response.json())
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			res.status(500).send({
				status: 500,
				message: error.message,
				error: error
			});
		});
};
