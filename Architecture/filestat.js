'use strict';

var fs = require('fs');

var path = require('path');

// resolve the current working Dictionary
var workDir = path.resolve('..');

var ReqPath = path.join(workDir,'Requests');

fs.readdir(ReqPath,function (errdir,files_source) {
    if (errdir){
        console.log(errdir);
    } else {
        console.log(files_source);

        for (var i =0; i <files_source.length; i++){

            var filePath = path.join(workDir,'Requests',files_source[i]);
            
            fs.readFile(filePath,'utf-8', function (errfile, data) {
                if (errfile) {
                    console.log(errfile);
                } else {
                    console.log(data);
                }
            });
        }
    }
});