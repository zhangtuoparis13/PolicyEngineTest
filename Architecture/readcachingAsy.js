/**
 * Created by TBtuo on 25/04/16.
 */

var fs = require('fs');

var path = require('path');

var readdirAsy = require('./walkdir');

var workDir = path.resolve('..');

var ReqPath = path.join(workDir,'Requests');

function readAsync(file, callback) {
    fs.readFile(file,'utf-8',callback);
}



/*
readdirAsy(ReqPath,function (err,files_sources) {
    if (err) throw err;
    console.log(files_sources);

    async.map(files_sources,readAsync,function (err,results) {
        console.log(results);
    })
});*/
