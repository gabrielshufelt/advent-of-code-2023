const fs = require('fs');
const readLine = require('readline');

function isWinningNum(num, winningNums) {
    const index = winningNums.indexOf(num);
    return index !== -1;
}

function getPoints(exp) {
    if (exp == 0) {
        return 0;
    }
    else if (exp == 1) {
        return 1;
    }
    else {
        return 2*(getPoints(exp-1));
    }
}

void (async () => {
    let pts = 0;
    const r1 = readLine.createInterface(
        {input: fs.createReadStream('day4_input.txt')}
    );
    r1.on('line', (line) => {
        const row = line.split(":")[1].split('|');
        const winningNums = row[0].trim().split(/\s+/), nums = row[1].trim().split(/\s+/);
        let exp = 0;

        for (let i=0; i<nums.length; i++) {
            if (isWinningNum(nums[i], winningNums)) {exp++;}
        }
        pts += getPoints(exp);
    });
    await new Promise((res) => r1.once('close', res));
    console.log(pts);
})();