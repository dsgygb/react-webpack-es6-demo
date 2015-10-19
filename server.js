var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: false,
    historyApiFallback: true
}).listen(8080, '127.0.0.1', function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log('Listening at localhost:8080');
    });



/*以下是实现的一个简单的留言的后端*/

var http = require('http');
var qs = require('querystring');
var commentsData = [
    {"author": "作者1姓名", "text": "留言1内容"},
    {"author": "作者2姓名", "text": "留言2内容*这里是测试的斜体的markdown内容*"}
];
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json','Access-Control-Allow-Origin':"*"});

    if(req.method=="GET"){

        switch (req.url){
            case '/comments':
                res.end(JSON.stringify(commentsData));
                break;
        }

    }else if(req.method=="POST"){
        switch (req.url){
            case '/comment':
                var body = '';
                req.on('data',function(chunk){
                    body += chunk;
                    if(body.length>1e6){
                        req.connection.destroy();
                    }
                });

                req.on('end',function(){

                    var post = qs.parse(body);
                    //console.log(post);
                    commentsData = commentsData.concat([{"author": post.author, "text":post.text}]);
                    //console.log(commentsData);
                    res.end(JSON.stringify({code:200,data:commentsData}));
                });
                break;
        }


    }else{

        res.end(JSON.stringify(commentsData));

    }





}).listen(12121, "127.0.0.1",function(){
    console.log('已开启端口号为12121的后端服务器');
});