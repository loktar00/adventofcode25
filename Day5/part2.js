import fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');

const database = data.toString().split('\r\n\r\n');

const ranges = database[0].split('\r\n');

const rangeNumbers = ranges.reduce((acc, cur) => {
    const values = [...cur.split('-')].map(el => parseInt(el, 10));
    return acc = [...acc, [...values]]
}, []);

// Random notes.
// Part 2.. I need to count every number of potential fresh ingedients..
// It's a simple difference/subtraction however some ranges are inclusive..

// How I'm thinking is I start with each range and count the inclusive with max - min.
// but I also need to look at all other ranges and see if the current range overlaps at all.

// Maybe I should sort all the ranges by their min value.. then look if my min, or max falls between any existing?

// I need to combine any ranges possible, then subtract each range.

// Sort all the ranges by lowest
rangeNumbers.sort((a,b) => {
    if (a[0] < b[0]) {
        return -1;
    }
    if (a[0] > b[0]) {
        return 1;
    }
    return 0;
});

// go through each range and see if they overlap.
for (let r = 0; r <= rangeNumbers.length - 1; r++) {
    if (r === rangeNumbers.length - 1) {
        continue;
    }
    if (rangeNumbers[r][1] >= rangeNumbers[r + 1][0]) {
        rangeNumbers[r + 1][0] = rangeNumbers[r][0];
        if (rangeNumbers[r][1] >= rangeNumbers[r + 1][1]) {
            rangeNumbers[r + 1][1] = rangeNumbers[r][1];
        }
        rangeNumbers[r] = [0,0]
    }
}

// console.log(rangeNumbers.filter(range => range[0] && range[1]).join('|'))
console.log(rangeNumbers.filter(range => range[0] && range[1]).reduce((prev, cur) => prev + ((cur[1]+1) - cur[0]), 0));
