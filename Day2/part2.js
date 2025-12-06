import fs from 'fs';
const data = fs.readFileSync('./input.txt', 'utf-8');

const inputs = data.toString().split(',');

let invalidNumbers = [];

function validMatch(val, len = '') {
    const reg = new RegExp(String.raw`(\d{1,${len}})\1+`);
    const match = val.match(reg);
    if (match && match?.length && match[0].length === val.length) {
        return parseInt(match[0], 10);
    }

    return false;
}

function checkInvalidRegex(val) {
    const valStr = val.toString();
    const unique = new Set([...valStr]);
    const uniqueSize = unique.size;

    // start looking for matches.... probably a MUCH better way to do this..
    if (uniqueSize !== valStr.length) {
        const iterations = [1,2,''];

        for (let iteration of iterations) {
            let matchCheck = validMatch(valStr, iteration);
            if (matchCheck) {
                return matchCheck;
            }
        }
        return false;
    }
}

for (let input of inputs) {
    const range = input.split('-');
    for (let i = parseInt(range[0], 10); i <= parseInt(range[1], 10); i++) {
        const invalidValue = checkInvalidRegex(i);
        invalidValue && invalidNumbers.push(invalidValue);
    }
}

console.log(invalidNumbers.reduce((prev, cur) => prev + cur, 0));