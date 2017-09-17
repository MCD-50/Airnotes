const { userSchema } = require('./user');
const { noteSchema } = require('./note');

module.exports.model = (app, mongoose) => {
	userSchema(app, mongoose);
	noteSchema(app, mongoose);
}