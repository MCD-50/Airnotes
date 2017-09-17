const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const db_name_notes = 'Notes';
const db_name_users = 'Users';

const { model } = require('./model');
const { mongoUrl } = require('./key');
const { sendMail } = require('./email');

const randomString = require('randomstring');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//setup mongoose
app.db = mongoose.createConnection('mongodb://airnotes:airnotes@ds141274.mlab.com:41274/airnotes');
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.once('open', () => {
	app.listen(2000)
	console.log('listening on 2000 with db');
});

//init model
model(app, mongoose);

//Check if connected
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to the REST API' });
});




app.post('/login', (req, res) => {
	if (req.body && req.body.email && req.body.pin) {
		req.app.db.models.User.findOne({ email: req.body.email })
			.exec((err, success) => {
				if (success && success.pin == req.body.pin) {
					res.status(200).json({ message: 'success' });
				} else {
					res.status(200).json({ message: 'wrong email or pin.' });
				}
			})
	} else {
		res.status(200).json({ message: 'no email provided', });
	}
})

app.post('/register', (req, res) => {
	if (req.body && req.body.email) {
		let body = {};
		Object.keys(req.body).forEach(key => {
			if (key != '_id' && key != 'pin') {
				body[key] = req.body[key];
			}
		})

		const pin = generatePin();
		body['pin'] = pin

		req.app.db.models.User.findOne({ email: req.body.email })
			.lean()
			.exec((err, _success) => {
				if (!_success) {
					req.app.db.models.User.create(body, (err, success) => {
						if (success) {
							sendMail(body.email, pin);
							res.status(200).json({ message: 'success' });
						} else {
							res.status(200).json({ message: 'database error' });
						}
					})
				} else {
					res.status(200).json({ message: 'user already exists' });
				}
			})
	} else {
		res.status(200).json({ message: 'no email provided' });
	}
})

app.post('/resendpin', (req, res) => {
	if (req.body && req.body.email) {
		req.app.db.models.User.findOne({ email: req.body.email })
			.lean()
			.exec((err, success) => {
				if (success) {
					sendMail(req.body.email, success.pin);
					res.status(200).json({ message: 'success' });
				} else {
					res.status(200).json({ message: 'user does not exists' });
				}
			})
	} else {
		res.status(200).json({ message: 'no email provided' });
	}
})


app.post('/getuser', (req, res) => {
	if (req.body && req.body.email) {
		req.app.db.models.User.findOne({ email: req.body.email })
			.exec((err, success) => {
				if (success) {
					res.status(200).json({ message: 'success', item: success });
				} else {
					res.status(200).json({ message: 'database error', item: null });
				}
			})
	} else {
		res.status(200).json({ message: 'no email provided', item: null });
	}
})

app.post('/updateuser', (req, res) => {
	if (req.body && req.body.email) {
		req.app.db.models.User.findOne({ email: req.body.email })
			.exec((err, success) => {
				if (success) {
					Object.keys(req.body).forEach(key => {
						if (key != '_id') {
							success[key] = req.body[key];
						}
					})
					success.save();
					res.status(200).json({ message: 'success' });
				} else {
					res.status(200).json({ message: 'database error' });
				}
			})
	} else {
		res.status(200).json({ message: 'no email provided' });
	}
})

app.post('/deleteuser', (req, res) => {
	if (req.body && req.body.email && req.body.pin) {
		req.app.db.models.User.findOneAndRemove({
			$and: [
				{ email: req.body.email },
				{ pin: req.body.pin }
			]
		}).exec((err, success) => {
			if (success) {
				res.status(200).json({ message: 'success' });
			} else {
				res.status(200).json({ message: 'database error' });
			}
		})
	} else {
		res.status(200).json({ message: 'no email provided' });
	}
})




//CRUD operation
app.post('/getnotes', (req, res) => {
	if (req.body && req.body.userId) {
		req.app.db.models.Note.find({ userId: req.body.userId })
			.exec((err, success) => {
				if (success) {
					success = success.map(x => {
						if (x['_id']) {
							delete x['_id'];
						}
						return Object.assign(x, { itemId: x._id });
					});
					res.status(200).json({ message: 'success', items: success });
				} else {
					res.status(200).json({ message: 'database error', items: [] });
				}
			})
	} else {
		res.status(200).json({ message: 'no user id provided', items: [] });
	}
})

app.post('/addnote', (req, res) => {
	if (req.body && req.body.userId) {
		let body = {};
		Object.keys(req.body).forEach(key => {
			if (key != '_id' && key != 'itemId') {
				body[key] = req.body[key];
			}
		})

		req.app.db.models.Note.create(body)
			.exec((err, success) => {
				if (success) {
					res.status(200).json({ message: 'success' });
				} else {
					res.status(200).json({ message: 'database error' });
				}
			})
	} else {
		res.status(200).json({ message: 'no user id provided' });
	}
})

app.post('/updatenote', (req, res) => {
	if (req.body && req.body.itemId) {
		let body = {};
		Object.keys(req.body).forEach(key => {
			if (key != '_id' && key != 'itemId') {
				body[key] = req.body[key];
			}
		})

		req.app.db.models.Note.findOneAndUpdate({ _id: req.body.itemId }, body, (err, success) => {
			if (success) {
				res.status(200).json({ message: 'success' });
			} else {
				res.status(200).json({ message: 'database error' });
			}
		})
	} else {
		res.status(200).json({ message: 'no item id provided' });
	}
})

app.post('/deletenote', (req, res) => {
	if (req.body && req.body.itemId) {
		req.app.db.models.Note.findOneAndRemove({ _id: req.body.itemId })
			.exec((err, success) => {
				if (success) {
					res.status(200).json({ message: 'success' });
				} else {
					res.status(200).json({ message: 'database error' });
				}
			})
	} else {
		res.status(200).json({ message: 'no item id provided' });
	}
})

const generatePin = () => {
	return randomString.generate({
		length: 4,
		charset: 'numeric',
		capitalization: 'lowercase'
	});
}