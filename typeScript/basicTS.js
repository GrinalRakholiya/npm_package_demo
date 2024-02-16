var _a, _b;
var message = "Hello";
console.log(message);
//----------------------------------------------------------------------------------
var age = 20;
if (age < 50)
    age += 10;
console.log(age);
//type annotation-------------------------------------------------------------------
var sales = 123; //instead  let sales: number = 123;
var level; //this is type named any
// Tuple Example-------------------------------------------------------------------
var employee;
employee = ["John Doe", 30];
console.log("Name: ".concat(employee[0], ", Age: ").concat(employee[1]));
// Enum Example----------------------------------------------------------------------
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var backgroundColor = Color.Red;
console.log("Background Color:", backgroundColor);
//---------------------------------------------------------------------------------------
function addNumbers(a, b) {
    return a + b;
}
var result = addNumbers(5, 3);
console.log("Result:", result);
//object example-------------------------------------------------------------------------
var person = {
    firstName: "John",
    age: 30,
    greet: function () {
        console.log("Hello, my name is ".concat(this.firstName, ". I am ").concat(this.age, " years old."));
    }
};
console.log("First Name:", person.firstName);
console.log("Age:", person.age);
person.greet();
//union types---------------------------------------------------------------------------
function displayValue(value) {
    console.log("The value is:", value);
}
displayValue("Hello"); // Output: The value is: Hello
displayValue(123); // Output: The value is: 123
//literal type--------------------------------------------------------------------------
var state;
state = "success"; // Valid
// Number literal type
var errorCode;
errorCode = 200; // Valid
//nullable type-------------------------------------------------------------------------
var nullableString;
nullableString = "Hello, TypeScript!";
console.log(nullableString);
nullableString = null;
console.log(nullableString); // Output: null
//optional chaining---------------------------------------------------------------------
var persons = {
    name: 'John',
    age: 30,
    address: {
        city: 'New York',
        postalCode: '10001'
    }
};
var postalCode = (_a = persons === null || persons === void 0 ? void 0 : persons.address) === null || _a === void 0 ? void 0 : _a.postalCode;
console.log(postalCode); // Output: 10001
var invalidPostalCode = (_b = persons === null || persons === void 0 ? void 0 : persons.address) === null || _b === void 0 ? void 0 : _b.city;
console.log(invalidPostalCode); // Output: undefined
//string merge-----------------------------------------------------------------------------
function count(s, char) {
    var count = 0;
    for (var i = 0; i < s.length; i++) {
        if (s[i] === char) {
            count++;
        }
    }
    return count;
}
function merge(s1, s2) {
    var op = "";
    var i = 0, j = 0;
    while (i < s1.length && j < s2.length) {
        var c1 = s1[i]; //c1=char1
        var c2 = s2[j];
        var count1 = count(s1, c1);
        var count2 = count(s2, c2);
        if (count1 < count2 || (count1 === count2 && c1 < c2)) {
            op += c1;
            i++;
        }
        else {
            op += c2;
            j++;
        }
    }
    while (i < s1.length) {
        op += s1[i++];
    }
    while (j < s2.length) {
        op += s2[j++];
    }
    return op;
}
console.log(merge("dce", "cccbd"));
console.log(merge("super", "tower"));
