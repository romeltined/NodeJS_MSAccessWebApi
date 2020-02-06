var http = require('http');

var post_req  = null,
    post_data = '{"Field1":"CURR","Field2":"TestHost01"}';
	
var post_options = {
    hostname: 'localhost',
    port    : '8080',
    path    : '/api/user',
    method  : 'POST',
    headers : {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Length': post_data.length
    }
};

post_req = http.request(post_options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('Response: ', chunk);
    });
});

post_req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});


//node "C:\nodejs\nodejswebapi\client.js"

post_req.write(post_data);
post_req.end();