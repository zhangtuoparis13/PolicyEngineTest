/*
* @Author: TBtuo
* @Date:   2016-04-14 16:42:38
* @Last Modified by:   TBtuo
* @Last Modified time: 2016-04-14 16:42:49
*/

'use strict';

var path = require('path');
// resolve the current working Dictionary
var workDir = path.resolve('..');
// 
console.log(workDir);
// compose the whole path of the file
var filePath = path.join(workDir,'Resources','index.html');

console.log(filePath);