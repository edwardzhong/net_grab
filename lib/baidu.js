const qs = require('querystring')
const { saveFile } = require('./common/util')
const { request } = require('./common/net')
const cheerio = require('cheerio')

/**
 * 百度搜索  间隔50ms调用一次
 * @param  {String}   keyword 
 * @param  {Function} cb     
 * @return {[type]}          
 */
exports.baiduSearch = function (keyword) {
	var i = 0,
		size = 10,
		pages = 5;

	(function () {
		if (i >= pages) return;
		baiduRequset(i, size, keyword, '_baidu.html');
		setTimeout(arguments.callee, 50);
		i++;
	}());
};


async function baiduRequset(pageNo, pageSize, keyword) {
	var path = '/s?' + qs.stringify({
		ie: 'utf-8',
		f: 8,
		rsv_bp: 1,
		tn: 'baidu',
		rn: pageSize,
		pn: pageNo * pageSize,
		wd: keyword
	}),
		options = {
			hostname: 'www.baidu.com',
			port: 443,
			path: path,
			method: 'GET',
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
			}
		};

	const content = await request(options);
	saveFile(pageNo, keyword, content, 'baidu.html');
	// showBaiduResult(pageNo, content);
}

/**
 * 显示结果
 * @param  {[type]} pageNo [description]
 * @param  {[type]} body   [description]
 * @return {[type]}        [description]
 */
function showBaiduResult(pageNo, body) {
	var title, summary, link,
		reg = /<[^<>]+>/g,
		$ = cheerio.load(body, { decodeEntities: false });

	$('#content_left .result').each((i, item) => {
		var $a = $(item).find('h3 a');
		title = $a.html();
		link = $a.attr('href');
		summary = $(item).find('.c-abstract').html();
		if (title) {
			console.log(`第${pageNo + 1}页 第${i + 1}条`);
			console.log(`link: ${link}`.green);
			console.log(`title: ${title}`);
			if (summary) {
				console.log(`summary: ${summary}`);
			}
		}
		console.log('------------------------------');
		console.log('');
	});
}
