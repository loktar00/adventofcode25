import fs from 'fs';


const data = fs.readFileSync('./input.txt', 'utf-8');

const inputs = data.toString().split('\r\n');

let dialPosition = 50;
let password = 0;

function rotate(val) {
    while (val < 0 || val > 99) {
        if (val < 0) {
            val += 100;
        } else if (val > 99) {
            val -= 100;
        }
    }

    return val;
}

inputs.forEach(input => {
    const direction = input.split('')[0] === 'L' ? -1 : 1;
    const movement = parseInt(input.split('').splice(1,input.length).join(''), 10);
    dialPosition += (movement * direction);
    dialPosition = rotate(dialPosition);
    if (!dialPosition) {
        password++;
    }
});

console.log(password);

