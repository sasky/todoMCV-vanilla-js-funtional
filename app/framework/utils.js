
 // Object.prototype.toString.call() will check the type of any primitive or object in JavaScript:
// console.log(Object.prototype.toString.call(new Date())) // [object Date]
// console.log(Object.prototype.toString.call([])) // [object Array]
// console.log(Object.prototype.toString.call(true)) // [object Boolean]
// console.log(Object.prototype.toString.call(function () {})) // [object Function]
// console.log(Object.prototype.toString.call((x => x))) // [object Function]
// console.log(Object.prototype.toString.call(null)) // [object Null]
// console.log(Object.prototype.toString.call(37)) // [object Number]
// console.log(Object.prototype.toString.call(NaN)) // [object Number]
// console.log(Object.prototype.toString.call(Infinity)) // [object Number]
// console.log(Object.prototype.toString.call(-0)) // [object Number]
// console.log(Object.prototype.toString.call({})) // [object Object]
// console.log(Object.prototype.toString.call(/someRegularExpression/i)) // [object RegExp]
// console.log(Object.prototype.toString.call("")) // [object String]
// console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
// console.log(Object.prototype.toString.call()) // [object Undefined]
export const type_of = (someVariable) =>
	Object.prototype.toString.call(someVariable).slice(8, -1).toLowerCase();
