const http = require('https');
const qs = require('querystring');

/**
 * http get
 * @param  {String} url 
 * @param  {Object} form 
 */
function get(url, form) {
    return new Promise((resolve, reject) => {
        let body = '';
        http.get(url + '?' + qs.stringify(form), res => {
            res.setEncoding('utf8');
            res.on('data', data => {
                body += data;
            });

            res.on('end', () => {
                resolve(body);
            }).on('error', err => {
                reject(err)
            });
        });
    });
}

/**
 * http request post
 * @param  {Object} form 
 */
function request(opt) {
    const options = Object.assign({}, {
        hostname: '127.0.0.1',
        port: 80,
        path: opt.path,
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        }
    }, opt); 
    let body = '';

    return new Promise((resolve, reject) => {
        const req = http.request(options, res => {
            res.setEncoding('utf8');
            res.on('data', chunk => {
                body += chunk;
            });
            res.on('end', () => {
                resolve(body);
            });
        });

        req.on('error', err => {
            reject(err)
        });

        // post form
        // req.write(postData);
        req.end();
    });
}

module.exports = {
    get,
    request
}