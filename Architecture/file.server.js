/*
* @Author: TBtuo
* @Date:   2016-04-14 16:51:23
* @Last Modified by:   TBtuo
* @Last Modified time: 2016-04-14 16:51:32
*/

'use strict';

var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http');
// get the dictionary of the root , current repostoire bu default
var root = path.resolve(process.argv[2] || '../Resources');
console.log('Static root dir: ' + root);
// create a server:
var server = http.createServer(function (request,response) {
    // get the path of the url
    var pathname =url.parse(request.url).pathname;
    // get the current path
    var filepath = path.join(root,pathname);
    // get the stat of the file 
    fs.stat(filepath,function (err,stats) {
        if (!err && stats.isFile()) {
            // there is no error and th file exist
            console.log('200' + request.url);
            // send the 200 
            response.writeHead(200);
            // pipe the file to the response
            fs.createReadStream(filepath).pipe(response);
        } else {
            // error or the file dosent exist
            console.log('404' + request.url);
            // send the 404
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);

console.log('Server is running at http:// 127.0.0.1:8080/');
