import fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');

const rows = data.split('\r\n');

// Get the operations
let operations = rows.pop();
// Filter out the blanks
operations = operations.split('').filter(o => o !== ' ');

let numbers = [];
let totalLength = rows[1].length;

// Map each number to the array
for (let r = 0; r <= rows.length - 1; r ++) {
    for (let i = 0; i<= totalLength - 1; i++) {
        numbers[i] ? numbers[i] +=`${rows[r][i]}` : numbers[i] = `${rows[r][i]}`;
    }
}

// Reverse our array
numbers.reverse();
numbers = numbers.map(el => {
    // WE didn't strip out the " " so they'll be nan at that point insert the next operation
    if (isNaN(parseInt(el, 10))) {
        return operations.pop();
    }
    return parseInt(el, 10);
});
// operations array is one longer.. this is so messy.
numbers.push(operations.pop());

let total = 0;

let accumulator = [];
// Iterate through the numbers.. add each one to our accumulator array until we encounter a symbol, then just eval them together and add to the total
for (let num of numbers) {
    if (isNaN(parseInt(num, 10))) {
        let sum = accumulator.reduce((prev, cur) => eval(`${prev}${num}${cur}`));
        total += sum;
        accumulator = [];
    } else {
        accumulator.push(num);
    }
}

console.log(total);
