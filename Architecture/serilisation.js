/**
 * Created by TBtuo on 20/04/16.
 */

/*
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
    toJSON: function () {
        return { // 只输出name和age，并且改变了key：
            'Name': this.name,
            'Age': this.age
        };
    }
};

console.log(JSON.stringify(xiaoming,null,' ')); // '{"Name":"小明","Age":14}'
*/

var policyDecision ={
    request1: 'Done',
    parameter_integer: 14,
    parameter_bollen: true,
    parameter_float: 1.65,
    parameter_Null: null,
    'project-name': '\"W3C\" reTHINK',
    response1: ['Decision'],
    response2: [ { Decision: 'Permit' } ],

    toJSON: function () {
        return { // just output the response , and change the key at the same time
            'Request1': this.request1,
            'Response1': this.response1,
            'Response2': this.response2
        };
    }
};

console.log(JSON.stringify(policyDecision,null,' '));