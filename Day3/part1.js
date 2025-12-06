import fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');

const inputs = data.toString().split('\r\n');

let batteries = [];

for (let input of inputs) {
    const joltage = [...input];
    const max = (Math.max(...joltage, 0));
    const largestIndex = joltage.findIndex(el => parseInt(el,10) === max);
    const leftArr = joltage.slice(0, largestIndex).map(el => parseInt(`${el}${max}`, 10));
    const rightArr = joltage.slice(largestIndex + 1).map(el => parseInt(`${max}${el}`, 10));

    batteries.push(Math.max(...leftArr, ...rightArr));
}

console.log(batteries.reduce((prev, cur) => prev + cur))

