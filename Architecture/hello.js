/*
* @Author: TBtuo
* @Date:   2016-04-14 15:52:58
* @Last Modified by:   TBtuo
* @Last Modified time: 2016-04-14 16:05:52
*/

'use strict';
// import the module http
var http = require('http');
// create the http server , transfer the function callback at the same time
var server = http.createServer(function(request,response){
	// the function callback recieve the 'request and response' object
	// get the 'method and url' of the HTTP request
	console.log(request.method + ': ' + request.url);
	// write the response 200 into the 'response', set the ''Content-Type': 'text/html'' at the same time
	response.writeHead(200,{'Content-Type': 'text/html'});
	// take the HTTP response into 'response' :
	response.end('<h1>Hello,World!</h1>');
});

// let the server to listen th port 8080
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
