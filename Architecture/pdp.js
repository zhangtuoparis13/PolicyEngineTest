/*
 * @Author: TBtuo
 * @Date:   2016-04-12 09:24:53
 * @Last Modified by:   TBtuo
 * @Last Modified time: 2016-04-12 09:55:07
 */


function isObjectValueEqual(a, b) {
    // Of course, we can do it use for in
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

// unit test
/*var obj1 = {
    name: "Benjamin",
    sex : "male"
};

var obj2 = {
    name: "Benjamin",
    sex : "male"
};

//Outputs: true or false
console.log(isObjectValueEqual(obj1, obj2));
console.log(isObjectValueEqual(obj1.name, obj2.sex));*/

module.exports = isObjectValueEqual;