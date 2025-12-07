import fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');

const database = data.toString().split('\r\n\r\n');

const ranges = database[0].split('\r\n');
const ids = database[1].split('\r\n').map(el => parseInt(el, 10));

const rangeNumbers = ranges.reduce((acc, cur) => {
    const values = [...cur.split('-')].map(el => parseInt(el, 10));
    return acc = [...acc, [...values]]
}, []);

const minOutofRange = Math.min(...rangeNumbers.flat());
const maxOutofRange = Math.max(...rangeNumbers.flat());
let freshIngedients = 0;

// Initially tried to do this by creating an inclusive array where each id was added to it, then turned into a set
// puzzle input is way beyond the 4 billion allowed for JS, had to think of another way, I just brute force every range basically
// I'm thinking there's a way (besides the simple out of range min/max I do) to only check the "closer" ranges to the number maybe
// my sorting the range values in some order then understanding the start/end of the ranges splitting the check array by that then only checking that section.

ids.forEach(id => {
    if (id >= minOutofRange && id <= maxOutofRange) {
        // Within the overall range..
        for (let range of rangeNumbers) {
            if (id >= Math.min(...range) && id <= Math.max(...range)) {
                freshIngedients++;
                break;
            }
        }
    }
})
console.log(freshIngedients);
