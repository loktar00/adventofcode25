import fs from 'fs';


const data = fs.readFileSync('./input.txt', 'utf-8');
const inputs = data.toString().split('\r\n');

let dialPosition = 50;
let password = 0;

function rotate(range, direction) {
    for (let i=0; i< range; i++) {
        dialPosition = (dialPosition + direction) % 100;
        if (dialPosition === 0) {
            password++;
        }
    }
}

inputs.forEach((input) => {
    const direction = input.split('')[0] === 'L' ? -1 : 1;
    const range = parseInt(input.split('').splice(1, input.length).join(''), 10);
    rotate(range, direction);
});

console.log('password', password);