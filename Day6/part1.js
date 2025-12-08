import fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');

const rows = data.split('\r\n');

// I make WAAAAAY too many extra arrays :rip:

// Grab operations
const operations = rows[rows.length - 1].split(' ').filter(el=> el);
// remove operations row
rows.splice(rows.length - 1, 1);
const numbers = [];

// get numbers
for (let row of rows) {
    const rowArr = row.split(' ').filter(el=> el);
    for (let i = 0; i <= rowArr.length - 1; i++) {
        if (!numbers[i]) {
            numbers[i] = [];
        }
        numbers[i] = [...numbers[i], rowArr[i]];
    }
}

const answers = [];
for (let n = 0; n <= numbers.length -1; n++) {
    answers[n] = numbers[n].reduce((prev, cur) => eval(`${prev}${operations[n]}${cur}`));
}

console.log(answers.reduce((prev, cur) => prev + cur));