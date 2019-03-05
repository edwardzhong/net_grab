const fs = require('fs')
const path = require('path')

/**
 * get time String
 * @return {[type]} [description]
 */
const formatTime = t => {
	const d = t ? new Date(t) : new Date();
	return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2) + '-' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ':' + d.getMilliseconds();
}

/**
 * save File
 * @param  {String} keyword 
 * @param  {String} content 
 * @return {[type]}         [description]
 */
const saveFile = (pageNo, keyword, content, name) => {
	const fileName = `${formatTime()}_${pageNo}_${keyword}_${name || '.html'}`;
	const filePath = path.join(path.normalize(__dirname + '/../..'), 'download', fileName);
	fs.writeFile(filePath, content, "utf8", function (err) {
		console.log("%s download %s", fileName, err ? "fail" : "success");
	});
}

module.exports = {
	formatTime,
	saveFile
};