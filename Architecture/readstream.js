/*
 * @Author: TBtuo
 * @Date:   2016-04-12 09:24:53
 * @Last Modified by:   TBtuo
 * @Last Modified time: 2016-04-12 09:55:07
 */

'use strict';
// import the function in module PDP 
var compare = require('./pdp');
// import the orignal modules
var fs = require('fs');
var path = require('path');

// resolve the current working Dictionary
var workDir = path.resolve('..');

// compose the whole path of the file
var reqPath = path.join(workDir,'Requests','policyreq1.json');
var policyPath = path.join(workDir,'Resources','policy1.json');
var resPath = path.join(workDir,'Responses','decision.json');

// serilalisation the objects of the policyDescsion
var policyDecision ={
    request1: 'Done',
    parameter_integer: 14,
    parameter_bollen: true,
    parameter_float: 1.65,
    parameter_Null: null,
    'project-name': '\"W3C\" reTHINK',
    response_positive: [ { Decision: 'Permit' } ],
    response_negative: [ { Decision: 'Deny' } ],
    toJSON: function () {
        return { // just output the response , and change the key at the same time
            'Response': this.response_positive
        };
    }
};

/*function posi() {
    return {
        'Response': this.response_positive
    };
}

function nega() {
    return {
        'Response': this.response_negative
    };
}*/

// read the request in mode stream
var rs = fs.createReadStream(reqPath, 'utf-8');

rs.on('data', function (chunk) {
    console.log('Policy request 1(a sample XACML request expressed in JSON): ');
    console.log(chunk);
    
    console.log("\n *STARTING* \n");
    var jsonContent = JSON.parse(chunk);
    console.log("The role in the request is : ", jsonContent.subject.role);

    // Get policycontent from request file
    fs.readFile(policyPath,'utf-8', function(err1, contents) {
        // Define to JSON type
        var policyContent = JSON.parse(contents);
        if (err1) {
            console.error(err1);
        } else {
            // Get Value from JSON(policy file)
            console.log("The role in the request is: ", policyContent.target.subjects.subject.role);

            // invoke the compare method
            if (compare(jsonContent.subject.role, policyContent.target.subjects.subject.role)) {
                console.log('The same Role.');
                var ws_permit = fs.createWriteStream(resPath, 'utf-8');
                ws_permit.write(JSON.stringify(policyDecision, null, ' '));
                ws_permit.end();
            } else {
                console.log('Not the same Role.');
                var ws_deny = fs.createWriteStream(resPath, 'utf-8');
                ws_deny.write(JSON.stringify(policyDecision, null, ' '));
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



