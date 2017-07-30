import React, { Component } from 'react';
import DB from './factory.js';

class DatabaseHelper extends Component {
	getAllItems(callback) {
		DB.NOTE.get_all((results) => {
			let notes = Object.keys(results.rows).map((key) => {
				return results.rows[key];
			})
			console.log(notes);
			callback(notes);
		});
	}

	updateItem(noteid, data, callback) {
		DB.NOTE.update_id(noteid, data, function (results) {
			callback(results);
		})
	}

	addNewItem(data, callback) {
		DB.NOTE.add(data, function (results) {
			callback(results);
		})
	}

	getItemById(noteid, callback) {
		DB.NOTE.get_id(noteid, function (results) {
			callback(results);
		})
	}

	removeItemById(noteid, callback) {
		DB.NOTE.remove_id(noteid, function (results) {
			callback(results);
		})
	}
}

const databaseHelper = new DatabaseHelper();

export default databaseHelper;  