const nodemailer = require('nodemailer');
const { gmailPassword, gmailUser } = require('./key');

module.exports.sendMail = (to, pin) => {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: gmailUser,
			pass: gmailPassword
		}
	});

	var mailOptions = {
		from: gmailUser,
		to: to,
		subject: 'Thank you for registering with airnotes',
		text: `Your 4 digit pin : ${pin}`
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}