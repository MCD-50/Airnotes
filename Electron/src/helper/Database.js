const Datastore = require('nedb')
const db = new Datastore({ filename: __dirname + '/notes.db', autoload: true });

let is_loaded = false;

db.loadDatabase((error) => {
	if (!error){
		is_loaded = true;
	}
});

export const add = (val, callback) => {
	db.insert(val, (error, result) => {
		callback({
			error: error,
			result: result
		});
	});
}

export const update = (key, val, callback) => {
	db.update(key, val, {}, (error, result) => {
		callback({
			error: error,
			result: result
		})
	})
}

export const getAll = (callback) => {
	db.find({}, (error, result) => {
		callback({
			error: error,
			result: result
		})
	})
}

export const get = (option, callback) => {
	db.findOne(option, (error, result) => {
		callback({
			error: error,
			result: result
		})
	})
}

export const deleteOne = (key, callback) => {
	db.remove(key, {}, (error, result) => {
		callback({
			error: error,
			result: result
		})
	});
}

export const deleteAll = (callback) => {
	db.remove({}, { multi: true }, (error, result) => {
		callback({
			error: error,
			result: result
		})
	});
}
