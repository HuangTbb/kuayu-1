var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

    if(path === '/index.html'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync('public/index.html').toString())
        response.end()
    }else if(path === '/qq.js'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/qq.js').toString())
        response.end()
    }else if(path === '/friend.json'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        const ip = request.headers['referer']
        if(ip === 'http://frank.com:9999/'){
            response.setHeader('Access-Control-Allow-Origin', ip.substring(0,ip.length-1))
        }
        response.write(fs.readFileSync('public/friend.json').toString())
        response.end()
    }else if(path === '/friend.js'){
        // 防止不是要信任的网址访问
        if(request.headers['referer'].indexOf('http://frank.com:9999') === 0){
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
            const string = `window['{{xxx}}']({{data}})`
            const data = fs.readFileSync('public/friend.json').toString()
            const string2 = string.replace('{{data}}',data).replace('{{xxx}}', query.callback)
            response.write(string2)
            response.end()
        }else{
            response.statusCode = 404
            response.end()
        }
    }else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你输入的路径不存在对应的内容`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

ajax = (method, url, options)=>{
    return new Promise((resolve, reject)=>{
        const {success, fail} = options
        const request = new XMLHttpRequest()
        request.open(method, url)
        request.onreadystatechange = ()=>{
            if(request.readyState === 4){
// resolve reject
                if(request.status < 400){
                    resolve.call(null, request.response)
                }else if(request.status >= 400){
                    reject.call(null, request)
                }
            }
        }
        request.send()
    })
}
ajax('get', '/xxx')
    .then((response)=>{}, (request, status)=>{})
