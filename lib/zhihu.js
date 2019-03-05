const { get, request } = require('./common/net')
const {saveFile} = require('./common/util')

// https://www.zhihu.com/api/v4/search_v3?t=general&q=space%E6%B6%88%E8%B4%B9&correction=1&offset=10&limit=10&lc_idx=12&show_all_topics=0&search_hash_id=9dc242328d30c62fd7b151f3b33f2fa3&vertical_info=0%2C1%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C1
exports.zhihuSearch = async function (keyword) {
	const content = await get('https://www.zhihu.com/api/v4/search_v3', { t: 'general', q: keyword });
	saveFile(0, keyword, content,'zhihu.json');
};