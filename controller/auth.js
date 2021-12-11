const User = require('../model/user');

module.exports.login = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (username && password) {
		User.findOne({
			username: username,
			password: password,
		})
			.then((user) => {
				if (user) {
					res.json({
						token: 'eyJr389hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
					});
				} else {
					res.status(401);
					res.send('username or password is incorrect');
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}
};
