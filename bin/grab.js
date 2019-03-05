#!/usr/bin/env node
const program = require('commander');
const { baiduSearch } = require('../lib/baidu');
const { zhihuSearch } = require('../lib/zhihu');

program
	// .allowUnknownOption()//不报错误
	.version('0.0.1')
	.usage('这是我的网络爬虫程序😎'
		+ '\n  grap [option]'
		+ '\n    bd baidu: baidu search'
		+ '\n    zh zhihu: zhihu search')
	.on('--help', function () {
		console.log('  Examples:');
		console.log();
		console.log('    grab bd    <cmd>');
		console.log('    grab baidu <cmd>');
		console.log();
	});

program
	.command('baidu <cmd>')
	.alias('bd')
	.description('baidu search')
	.action(function (cmd, options) {
		console.log('baidu search "%s":', cmd);
		baiduSearch(cmd);
	});

program
	.command('zhihu <cmd>')
	.alias('zh')
	.description('search zhihu')
	.action(function (cmd, options) {
		console.log('zhihu search "%s":', cmd);
		zhihuSearch(cmd);
	});

program.parse(process.argv);

