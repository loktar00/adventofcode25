import fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf-8');

const inputs = data.toString().split('\r\n');

let grid = [];

let y = 0;
for (let input of inputs) {
    grid[y] = input.split('');
    y++;
}

let count = 0;
let hasXs = true;

while (hasXs) {
    const outputGrid = structuredClone(grid);
    for (let y = 0; y <= grid.length - 1; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '@') {
                /*
                    Not the most optimized way to do this, but the gist is we have a sliding rectangle for example

                    .@.@.@
                    .@.@.@
                    .@.@.@

                    On the first @ encountered we will see (removed commas for brevity)
                    [   ]
                    [. .]
                    [.@.]

                    Top row is empty because it's -0, middle row filters the element we're checking
                    bottom row is the full 3.

                    we then combine all 3 rows into a flattened array and count the number of @ symbols.

                    ... I did this really explicitely just to get the correct answer but this could definitely be golfed down
                */



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

    const totalXs = outputGrid.flat().filter(el => el === 'X').length;

    if (totalXs) {
        count += totalXs;
        grid = outputGrid.map(row => row.map(col => {
            if (col === 'X') {
                return '.'
            }

            return col;
        }));
    } else {
        hasXs = false;
    }
}

console.log(count);
