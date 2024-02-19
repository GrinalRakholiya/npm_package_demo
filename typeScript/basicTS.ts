let message : string ="Hello";
console.log(message);

//----------------------------------------------------------------------------------

let age: number=20;
if(age<50)
    age+=10;
console.log(age);

//type annotation-------------------------------------------------------------------

 let sales = 123; //instead  let sales: number = 123;
 let level; //this is type named any


 // Tuple Example-------------------------------------------------------------------

let employee: [string, number]; 

employee = ["John Doe", 30];
console.log(`Name: ${employee[0]}, Age: ${employee[1]}`);

// Enum Example----------------------------------------------------------------------

enum Color {
    Red,
    Green,
    Blue,
}
let backgroundColor: Color = Color.Red;
console.log("Background Color:", backgroundColor); 

//---------------------------------------------------------------------------------------

function addNumbers(a: number, b: number): number {
    return a + b;
}

let result = addNumbers(5, 3);
console.log("Result:", result); 

//object example-------------------------------------------------------------------------

let person = {
    firstName: "John",
    age: 30,   
    greet: function() {
        console.log(`Hello, my name is ${this.firstName}. I am ${this.age} years old.`);
    }
};

console.log("First Name:", person.firstName);
console.log("Age:", person.age);
person.greet(); 

//union types---------------------------------------------------------------------------

function displayValue(value: string | number) {
    console.log("The value is:", value);
}

displayValue("Hello"); // Output: The value is: Hello
displayValue(123);     // Output: The value is: 123

//literal type  useful for defining variables with specific, limited values.--------------------------------------------------------------------------

let state: "success" | "error";
state = "success"; // Valid

// Number literal type
let errorCode: 200 | 404 | 500;
errorCode = 200; // Valid

//nullable type-------------------------------------------------------------------------

let nullableString: string | null;

nullableString = "Hello, TypeScript!";
console.log(nullableString); 

nullableString = null;
console.log(nullableString); // Output: null

//optional chaining---------------------------------------------------------------------

const persons = {
    name: 'John',
    age: 30,
    address: {
        city: 'New York',
        postalCode: '10001'
    }
};

const postalCode = persons?.address?.postalCode;
console.log(postalCode); // Output: 10001

const invalidPostalCode = persons?.address?.city;
console.log(invalidPostalCode); // Output: undefined

//string merge-----------------------------------------------------------------------------

function count(s: string, char: string): number {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === char) {
      count++;
    }
  }
  return count;
}

function merge(s1: string, s2: string): string {
  let op = "";
  let i = 0,
    j = 0;

  while (i < s1.length && j < s2.length) {
    const c1 = s1[i]; //c1=char1
    const c2 = s2[j];
    const count1 = count(s1, c1);
    const count2 = count(s2, c2);

    if (count1 < count2 || (count1 === count2 && c1 < c2)) {
      op += c1;
      i++;
    } else {
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
