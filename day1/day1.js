const fs = require('fs');
const readLine = require('readline');

// PART 1
function isNum(value) {return typeof value === 'number';}
function reverse(s) {return s.split('').reverse().join("");}

void (async () => {
    let sum = 0;
    const r1 = readLine.createInterface(
        {input: fs.createReadStream('day1_p1_input.txt')});
    r1.on('line', (line) => {
        const regex = RegExp('\\d', 'g');
        let firstNum = line.match(regex)?.[0];
        let lastNum = reverse(line).match(regex)?.[0];
        sum += parseInt(firstNum + lastNum);
    });

    await new Promise((res) => r1.once('close', res));
    console.log(sum);
});

// PART 2
void (async () => {
    let sum = 0, lineNum = 0;
    const nums = {
        "zero" : 0,
        "one" : 1,
        "two" : 2,
        "three" : 3,
        "four" : 4,
        "five" : 5,
        "six" : 6,
        "seven" : 7,
        "eight" : 8,
        "nine" : 9
    };
    const r1 = readLine.createInterface(
        {input: fs.createReadStream('day1_p1_input.txt')});
        r1.on('line', (line) => {
            const replacedStr = line.replace(/one|two|three|four|five|six|seven|eight|nine/g, match => nums[match]);
            const regex = RegExp('\\d', 'g');
            let firstNum = replacedStr.match(regex)?.[0];
            let lastNum = reverse(replacedStr).match(regex)?.[0];
            console.log('line: ', line, ', replaced string: ', replacedStr);
            console.log('first num: ', firstNum, ', last num: ', lastNum, '\n');
            if (!isNaN(firstNum) && !isNaN(lastNum)) {
                sum += parseInt(firstNum + lastNum);
            }
    });

    await new Promise((res) => r1.once('close', res));
    console.log(sum);
});
