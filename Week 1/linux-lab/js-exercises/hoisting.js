// 1.
function cube(x) {
    return x * x * x;
  }
  
  // 2.
  function fullName(first, last) {
    return first + " " + last;
  }
  
  // 3.
  function power(base, exp) {
    if (exp === 0) {
      return 1;
    }
    return base * power(base, exp - 1);
  }
  
  // 4.
  function sumCubes(numbers) {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
      total = total + cube(numbers[i]);
    }
    return total;
  }

  console.log(cube(3))
  console.log(power(2,3))
  console.log(fullName("Joe","Doe"))
  console.log(sumCubes([1,2,3]))

const cubeh = function(x)
{
    return x * x * x;
}

const fullNameh = function(first, last)
{
    return first + " " + last;
}

const powerh = function(base,exp)
{
    if (exp === 0) {
        return 1;
    }
    return base * power(base, exp - 1);
}

const sumCubesh = function(numbers)
{
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
      total = total + cube(numbers[i]);
    }
    return total;
}

console.log(cubeh(3))
console.log(powerh(2,3))
console.log(fullNameh("Joe","Doe"))
console.log(sumCubesh([1,2,3]))

//1
let values = [10, 20, 30];
for(let i = 0; i < values.length; i++){
  console.log(values[i]);
}

//2
let lastLogin = '1/1/1970';

console.log(welcome('Charlie', 'Munger'));


function welcome(first, last) {
  return `Welcome, ${first} ${last}! You last logged in on ${lastLogin}.`
};
