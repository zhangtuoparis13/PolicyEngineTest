/*
 * @Author: TBtuo
 * @Date:   2016-04-12 09:24:53
 * @Last Modified by:   TBtuo
 * @Last Modified time: 2016-04-12 09:55:07
 */

'use strict';

var compare = require('./pdp');

var fs = require('fs');
var path = require('path');

// resolve the current working Dictionary
var workDir = path.resolve('..');
// 
console.log(workDir);
// compose the whole path of the file
var reqPath = path.join(workDir,'Requests','policyreq1.json');
var policyPath = path.join(workDir,'Resources','policy1.json');
var resPath = path.join(workDir,'Responses','decision.json');


var policyDecision ={
    request1: 'Done',
    parameter_integer: 14,
    parameter_bollen: true,
    parameter_float: 1.65,
    parameter_Null: null,
    'project-name': '\"W3C\" reTHINK',
    response1: ['Decision'],
    response2: {
        Decision:['Permit']
    },
    toJSON: function () {
        return { // just output the response , and change the key at the same time
            'Request1': this.request1,
            'Response1': this.response1,
            'Response2': this.response2
        };
    }
};


var rs = fs.createReadStream(reqPath, 'utf-8');

rs.on('data', function (chunk) {
    console.log('Policy request 1(a sample XACML request expressed in JSON): ');
    console.log(chunk);
    
    console.log("\n *STARTING* \n");
    var jsonContent = JSON.parse(chunk);
    console.log("The role is : ", jsonContent.subject.role);

    // Get policycontent from file
    fs.readFile(policyPath,'utf-8', function(err1, contents) {
        // Define to JSON type
        var policyContent = JSON.parse(contents);
        if (err1) {
            console.error(err1);
        } else {
            // Get Value from JSON
            console.log("Who?:", policyContent.target.subjects.subject.role);
            console.log(compare(jsonContent.subject.role,policyContent.target.subjects.subject.role));

            if (compare(jsonContent.subject.role,policyContent.target.subjects.subject.role)){
                var ws_permit = fs.createWriteStream(resPath,'utf-8');
                ws_permit.write(JSON.stringify(policyDecision,null,' '));
                ws_permit.end();
            } else {
                var ws_deny = fs.createWriteStream(resPath,'utf-8');
                ws_deny.write('write the deny in JSON file...\n');
                ws_deny.end();
            }
        }
    });

    console.log("\n *EXIT* \n");
});

rs.on('end',function () {
    console.log('END of analyse the request!');
});

rs.on('error',function (err) {
    console.log('ERROR: ' + err);
});



