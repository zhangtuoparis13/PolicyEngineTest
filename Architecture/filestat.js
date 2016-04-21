'use strict';

var fs = require('fs');

var path = require('path');

// resolve the current working Dictionary
var workDir = path.resolve('..');

var ReqPath = path.join(workDir,'Requests');

fs.readdir(ReqPath,function (err,files) {
    if (err){
        console.log(err);
    } else {
        console.log(files);
    }
});