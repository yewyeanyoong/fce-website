// 1. Parsing: Converts a JSON string into a JavaScript Object
const jsonString = '{"name": "Sarah", "age": 28, "isAdmin": true}';
const userObject = JSON.parse(jsonString);

console.log(userObject.name); // Output: Sarah
console.log(typeof userObject); // Output: object

// 2. Stringifying: Converts a JavaScript Object into a JSON string
const userObj = { name: "Sarah", age: 28, isAdmin: true };
const newJsonString = JSON.stringify(userObj);

console.log(newJsonString); // Output: {"name":"Sarah","age":28,"isAdmin":true}
console.log(typeof newJsonString); // Output: string

