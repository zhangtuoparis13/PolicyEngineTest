/*
 * @Author: TBtuo
 * @Date:   2016-04-12 09:24:53
 * @Last Modified by:   TBtuo
 * @Last Modified time: 2016-04-12 09:55:07
 */

'use strict';
// Define JSON File
var fs = require("fs");

var path = require('path');
// resolve the current working Dictionary
var workDir = path.resolve('..');
//
console.log(workDir);
// compose the whole path of the file
var reqPath = path.join(workDir,'Resources','policy1.json');

console.log("\n *STARTING* \n");
// Get content from file
var policyContent = fs.readFile(reqPath,'utf-8', function(err, contents) {
    // Define to JSON type
    var jsonContent = JSON.parse(contents);
    if (err) {
        console.error(err);
    } else {
        // Get Value from JSON
        console.log("Who?:", jsonContent.target.subjects.subject.role);
        console.log("Attach the resource?:", jsonContent.target.resources.resource.ispending);
        console.log("Do what?:", jsonContent.target.actions.action.actiontype);
        console.log("Rules effect? :", jsonContent.rule.effect);
        console.log("\n *EXIT* \n");
    }
});
console.log('Because this is a non-Blocking way.');

module.exports = policyContent;
