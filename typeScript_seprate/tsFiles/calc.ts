function greet(name: string) {
    console.log("Hello, " + name);
}

greet("Green"); // strict type-check

//----------------------------------------------------

function fn(n: number) {
  if (n > 5) {
    return true;
  } else {
    return false;
  }
  return true;  //unreachable
}

//------------------------------------------------------

function verifyAge(age: number) {
  // Forgot 'return' statement
  if (age > 18) {
    verified: true; //unused label
  }
}

//---------------------------------------------------------------

type User = {
  name: string;
  age1?: number; // Optional property exactOptionalPropertyTypes
};

const user: User = {
    name: "Alice",
    //age1: "30" // Mistakenly assigning a string to age
    age1: 12
};

//--------------------------------------------------------------------

// const a: number = 6;
 
// switch (a) {
//   case 0:
//     console.log("even"); //No Fallthrough Cases In Switch means break, return, or throw required
//   case 1:
//     console.log("odd");
//     break;
// }

//--------------------------------------------------------

// function fn(g) {  //Parameter 'g' implicitly has an 'any' type.   noImplicitAny

//   console.log(g.subtr(3));
// }

//-------------------------------------------------------------

// class Album {  //noImplicitOverride
//   setup() {}
// }
 
// class MLAlbum extends Album {
//   override setup() {}
// }
 
// class SharedAlbum extends Album {
//   setup() {} //must use override bcz it override member of base class
// }

//---------------------------------------------------------------

// function lookupHeadphonesManufacturer(color: "blue" | "black"): string {  //noImplicitReturns
//   //Function lacks ending return statement and return type does not include 'undefined'.

//   if (color === "blue") {
//     return "beats";
//   } else {
//     ("bose");
//   }
// }

//--------------------------------------------------------------------

// class Rectangle {  //noImplicitThis
//   width: number;
//   height: number;

//   constructor(width: number, height: number) {
//     this.width = width;
//     this.height = height;
//   }

//   getAreaFunction() {
//     return function () {
//       return this.width * this.height; // 'this' implicitly has type 'any' because it does not have a type annotation.
//     };
//   }
// }