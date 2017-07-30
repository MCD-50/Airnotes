
const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
]

export const getCreatedOn = (createdOn) => {
	let array = createdOn.split('-');
	let month = months[array[1]];
	return array[2] + ' ' + month + ', ' + array[0];
}


export const getDateTime = () => {
	let today = new Date();
	var dd = today.getDate();
	if (dd.toString().length < 2)
		dd = '0' + dd.toString()
	var mm = parseInt(today.getMonth()) + 1;
	if (mm.toString().length < 2)
		mm = '0' + mm.toString();
	var yyyy = today.getFullYear();
	return yyyy + '-' + mm + '-' + dd + ' ' + parseTime(today.getHours(), today.getMinutes(), today.getSeconds())
}

const parseTime = (hh, mm, ss) => {
	if (hh.toString().length < 2)
		hh = '0' + hh;
	if (mm.toString().length < 2)
		mm = '0' + mm;
	if (ss.toString().length < 2)
		ss = '0' + ss;
	return hh + ':' + mm + ':' + ss;
}
