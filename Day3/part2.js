import fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');

const inputs = data.toString().split('\r\n');

let batteries = [];

for (let input of inputs) {
    const joltage = [...input].map(el => parseInt(el, 10));
    const battery = [];
    let lastIndex = -1;
    let max = 0;
    let arr;

    for (let i = 11; i >= 0; i--){
        arr = [...joltage].slice(lastIndex + 1, joltage.length - i);
        max = (Math.max(...arr));
        lastIndex = arr.findIndex(el => el === max) + lastIndex + 1;
        battery.push(max);
    }
    batteries.push(battery.join(''))
}

console.log(batteries.reduce((prev, cur) => parseInt(prev, 10) + parseInt(cur, 10)))

