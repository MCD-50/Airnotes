const schema = {
	title: {
		type: String,
		default: ''
	},
	html: {
		type: String,
		default: ''
	},
	text: {
		type: String,
		default: ''
	},
	modifiedOn: {
		type: String,
		default: '',
	},
	itemType: {
		type: String,
		default: 'Note'
	},
	noteTag: {
		type: String,
		default: ''
	},
	taskType: {
		type: String,
		default: ''
	},
	endsIn: {
		type: String,
		default: ''
	}
}


module.exports.noteSchema = (app, mongoose) => {
	let noteSchema = new mongoose.Schema(schema);
	noteSchema.userId = {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	};
	noteSchema.index({ _id: 1 });
	app.db.model('Note', noteSchema);
};