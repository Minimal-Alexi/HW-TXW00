const HelloWorld = () => "Hello World";

const Double = (x) => x * x;


const Add = (x,y) => x + y

const Person = {
    name: "Alice",
    sayHi: () => "Hi, " + this.name + "!"
}

const numbers = [1, 2, 3, 4, 5];
const doubled = [];
numbers.forEach(num => doubled.push(num*2))

console.log(HelloWorld());
console.log(Double(5));
console.log(Add(5,6))
console.log(Person.sayHi())
doubled.forEach(num => console.log(num))
