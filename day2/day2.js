const fs = require('fs');
const readLine = require('readline');

// PART 1
void (async () => {
    let winningGameSum = 0;
    const r1 = readLine.createInterface(
        {input: fs.createReadStream('day2_input.txt')}
    );
    r1.on('line', (line) => {
        let elems = line.split(/[:;]+/);
        let gameId = elems[0].substring(5, elems[0].length);
        let isWinner = true;

        for (let i=1; i<elems.length; i++) {
            const cubes = elems[i].trim().split(/[\s,]+/);
            for (let j=0; j<cubes.length; j+=2) {
                switch(cubes[j+1]) {
                    case 'red':
                        if (cubes[j] > 12) {isWinner = false;}
                        break;
                    case 'green':
                        if (cubes[j] > 13) {isWinner = false;}
                        break;
                    case 'blue':
                        if (cubes[j] > 14) {isWinner = false;}
                        break;
                }
                if (!isWinner) {break;}
            }
            if (!isWinner) {break;}
        }
        if (isWinner) {winningGameSum += parseInt(gameId);
        console.log('winning game ', gameId);}
    });

    await new Promise((res) => r1.once('close', res));
    console.log(winningGameSum);
});

// PART 2
void (async () => {
    let sum = 0;
    const r1 = readLine.createInterface(
        {input: fs.createReadStream('day2_input.txt')}
    );
    r1.on('line', (line) => {
        let elems = line.split(/[\s,:;]+/);
        let minRed = 0, minGreen = 0, minBlue = 0;

        for (let i=2; i<elems.length; i+=2) {
            switch (elems[i+1]) {
                case 'red':
                    if (elems[i] > minRed) {minRed = parseInt(elems[i]);}
                    break;
                case 'green':
                    if (elems[i] > minGreen) {minGreen = parseInt(elems[i]);}
                    break;
                case 'blue':
                    if (elems[i] > minBlue) {minBlue = parseInt(elems[i]);}
                    break;
            }
        }
        sum += (minRed * minGreen * minBlue);

    });

    await new Promise((res) => r1.once('close', res));
    console.log(sum);
})();