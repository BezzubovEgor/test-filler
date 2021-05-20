const { readFile, writeFile } = require('fs').promises;

const Q_REG = /['"«»`]/g;
const END_REG = /[,:?\.]$/;

function isQuestion(str) {
    return str.trim().startsWith('##');
}

function isOption(str) {
    return str.trim().startsWith('-');
}

function isAnswer(str) {
    return str.trim().startsWith('- >');
}

function last(arr) {
    return arr[arr.length - 1];
}

function format(str, toReplace = '') {
    return str.replace(toReplace, '').trim()
        .replace(Q_REG, '')
        .replace(/–/g, '-')
        .replace(END_REG, '');
}

readFile("./data/SPO.md", 'utf-8')
    .then(data => data
        .split('\n')
        .filter(row => !!(row.trim()))
        .reduce((acc, row) => {
            console.log(row)
            const lastItem = last(acc);

            if (isQuestion(row)) {
                acc.push({
                    question: format(row, '##'),
                    number: parseInt(row),
                    options: [],
                    answers: [],
                });
            } else if (isAnswer(row)) {
                lastItem.options.push(format(row, '- >'));
                lastItem.answers.push(format(row, '- >'));
            } else if (isOption(row)) {
                lastItem.options.push(format(row, '-'));
            }
            return acc;
        },[]))
    .then(data => writeFile('./dist/spo.json', JSON.stringify(data, null, 2)));
