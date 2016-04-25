/**
 * Created by TBtuo on 25/04/16.
 */

'use strict';

var fs = require('fs');

var path = require('path');

var async = require("async");

// resolve the current working Dictionary
var workDir = path.resolve('..');

var ReqPath = path.join(workDir,'Requests');

fs.readdir(ReqPath,function (errdir,files_source) {
    if (errdir){
        console.log(errdir);
    } else {
        console.log(files_source);
    }
});


/*
var files = ['1.html', '2.html', '3.html'];

function read(file) {
    require('fs').readFile(file, 'utf8', function (error,data) {
        cache[file]=data;
    });
}

for(var i = 0; i < files.length; i++){
    read(files[i]);
}*/

/*
function readdir(dir) {
    fs.readdir(dir,function (errdir,files_source) {
        if (errdir){
            console.log(errdir);
        } else {
            console.log(files_source);
        }
    });
}

var abc = readdir(ReqPath);

console.log(abc);*/

/*
function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}

travel(ReqPath,function (pathname) {
    return pathname;
});
*/


















