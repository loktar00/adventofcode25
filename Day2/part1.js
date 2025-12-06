import fs from 'fs';
const data = fs.readFileSync('./puzinput.txt', 'utf-8');

const inputs = data.toString().split(',');

let invalidNumbers = [];

function checkInvalid(val) {
    const valStr = val.toString();
    if (valStr.substr(0, valStr.length / 2) === valStr.substr(valStr.length / 2, valStr.length)) {
        invalidNumbers.push(parseInt(valStr, 10));
    }
}

for (let input of inputs) {
    const range = input.split('-');
    for (let i = parseInt(range[0], 10); i <= parseInt(range[1], 10); i++) {
        if (i.toString().length % 2 === 0) {
            checkInvalid(i);
        }
    }
}

console.log(invalidNumbers.reduce((prev, cur) => prev + cur, 0));