/**
 * Created by TBtuo on 25/04/16.
 */

var fs = require('fs');

var path = require('path');

var workDir = path.resolve('..');

var ReqPath = path.join(workDir,'Requests');

function walk(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
}

module.exports = walk;

/*walk(ReqPath, function(err, files_source) {
    if (err) throw err;
    console.log(files_source);
});*/
