var RNDBModel = require('react-native-db-models')

const NOTE = 'NOTE';
var DB = {
	'NOTE': new RNDBModel.create_db(NOTE),
}
export default DB;