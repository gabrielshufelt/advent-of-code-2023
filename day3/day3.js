const fs = require('fs');

const readLine = require('readline');

 

// PART 1

function searchAround(scheme, i, j, length) {

    let regex = /[\*\#\+\$\&\/\%\@\=\-]/;

    let chars = scheme[i].split("");

    let isPartNumber = true;

    let end = j+length;

 

    for (j; j<end; j++) {

        // top row

        if (i == 0) {

            let charsBelow = scheme[i+1].split("");

            if (j == 0) {

                if (regex.test(charsBelow[j]) || regex.test(charsBelow[j+1] || regex.test(chars[j+1]))) {

                    isPartNumber = false;

                }

            }

            else if (j == scheme.length - 1 && (regex.test(charsBelow[j])) || regex.test(charsBelow[j-1] || regex.test(chars[j-1]))) {

                isPartNumber = false;

            }

            else {

                if (regex.test(charsBelow[j]) || regex.test(charsBelow[j+1]) || regex.test(chars[j+1]) ||

                regex.test(charsBelow[j-1] || regex.test(chars[j-1]))) {

                    isPartNumber = false;

                }

            }

        }

        // bottom row

        else if (i == scheme.length - 1) {

            let charsAbove = scheme[i-1].split("");

            if (j == 0) {

                if (regex.test(charsAbove[j]) || regex.test(charsAbove[j+1] || regex.test(chars[j+1]))) {

                    isPartNumber = false;

                }

            }

            else if (j == scheme.length - 1 && (regex.test(charsAbove[j])) || regex.test(charsAbove[j-1] || regex.test(chars[j-1]))) {

                isPartNumber = false;

            }

            else {

                if (regex.test(charsAbove[j]) || regex.test(charsAbove[j+1]) || regex.test(chars[j+1]) ||

                regex.test(charsAbove[j-1] || regex.test(chars[j-1]))) {

                    isPartNumber = false;

                }

            }

        }

        // middle row

        else {

            let charsAbove = scheme[i-1].split("");

            let charsBelow = scheme[i+1].split("");

 

            if (regex.test(charsAbove[j]) || regex.test(charsAbove[j+1]) || regex.test(chars[j+1]) || regex.test(charsBelow[j+1]) ||

            regex.test(charsBelow[j]) || regex.test(charsBelow[j-1]) || regex.test(chars[j-1]) || regex.test(charsAbove[j-1]))

            {

                isPartNumber = false;

            }

        }

    }

   

 

    return isPartNumber;

}

 

void (async () => {

    const scheme = [];

    let lineNumber = 0;

    let sum = 0;

    const r1 = readLine.createInterface(

        {input: fs.createReadStream('day3_input.txt')}

    );

    r1.on('line', (line) => {

        scheme[lineNumber++] = line;

    });

    await new Promise((res) => r1.once('close', res));

   

    // for each row

    for (let i=0; i<scheme.length; i++) {

        // identify numbers

        let chars = scheme[i];

 

        // for each character in current row

        for (let pos = 0; pos<chars.length; pos++) {

            if (!isNaN(chars[pos])) {

                let j = pos;

 

                // increment j until the end of number is found

                while (!isNaN(chars[pos+1])) {pos++;}

 

                let length = pos - j + 1;

                if (!searchAround(scheme, i, j, length)) {

                    sum += parseInt(scheme[i].substr(j, length));

                }

            }

            // character is not a digit, continue to next character

            else {continue;}

        }

    }

    console.log(sum);

})();