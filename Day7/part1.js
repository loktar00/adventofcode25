import fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');

const rows = data.split('\r\n');
let arr = [];
let split = 0;

for (let y = 0; y <= rows.length - 1; y++) {
    const xData = rows[y].split('');
    if (!arr[y]) {
        arr[y] = [];
    }

    for (let x = 0; x <= xData.length - 1; x++) {
        if (!arr[y][x]) {
            arr[y][x] = xData[x];
        }

         if (y > 0) {
            if (arr[y - 1][x] === 'S') {
                arr[y][x] = '|';
            }

            if (arr[y - 1][x] === '|') {

                if(xData[x] === '^') {
                    // Length might screw up here
                    if(x - 1 > -1 && x + 1 < xData.length) {
                        split++;
                        arr[y][x - 1] = '|';
                        arr[y][x + 1] = '|';
                    }
                } else {
                    arr[y][x] = '|';
                }
            }
        }
    }
}

for(var r = 0; r <= rows.length -1; r++) {
    console.log(arr[r].join(''));
}
console.log(split)