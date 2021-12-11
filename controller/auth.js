const User = require('../model/user');

module.exports.login = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	if (username && password) {
		User.findOne({
			username,
			password,
		})
			.then(() => {
				res.json({
					token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
				});
			})
			.catch(() => {
				res.status(401).json({
					status: 'Error',
					msg: 'username or password is incorrect',
				});
			});
	}
};
