const schema = {
	email: {
		type: String,
		unique: true
	},
	name: {
		type: String,
		default: 'Dude'
	},
	pin: {
		type: String
	},
	createdAt: {
		type: Date,
		default: new Date()
	},
}


module.exports.userSchema = (app, mongoose) => {
	let userSchema = new mongoose.Schema(schema);
	userSchema.index({ _id: 1 });
	app.db.model('User', userSchema);
};