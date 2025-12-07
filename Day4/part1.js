import fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');

const inputs = data.toString().split('\r\n');

const grid = [];

let y = 0;
for (let input of inputs) {
    grid[y] = input.split('');
    y++;
}

const outputGrid = structuredClone(grid);

for (let y = 0; y <= grid.length - 1; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === '@') {
            let topRow = grid[Math.max(y - 1, 0)].slice(Math.max(x - 1, 0), Math.min(x + 2, grid[y].length));
            if ( y === 0 ) {
                topRow = [];
            }
            const start = Math.max(x - 1, 0);
            const end = Math.min(x + 2, grid[y].length);
            let currentRow = grid[y].slice(start, end);

            const centerIndex = x - start;
            currentRow.splice(centerIndex, 1);

            let bottomRow = grid[Math.min(y + 1, grid.length - 1)].slice(Math.max(x - 1, 0), Math.min(x + 2, grid[y].length));
            if (y === grid.length-1) {
                bottomRow = [];
            }

            if ([...topRow, ...currentRow, ...bottomRow].filter(el => el === '@').length < 4) {
                outputGrid[y][x] = 'X';
            }
        }
    }
}

console.log(outputGrid.flat().filter(el => el === 'X').length)
outputGrid.forEach(el => console.log(el.join('')));
