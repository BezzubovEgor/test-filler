const { readFile, writeFile } = require('fs').promises;
const pdf = require("pdf-parse");

const Q_REG = /['"«»`]/g;
const N_REG = /^[0-9]+\./;

function isStartsWithNumber(str) {
    return N_REG.test(str);
}

function last(arr) {
    return arr[arr.length - 1];
}

function format(str) {
    return str.trim().replace(Q_REG, '').replace(/–/g, '-');
}

readFile("./data/test-data.pdf")
    .then(buffer => pdf(buffer))
    .then(data => data.text
        .split('\n')
        .filter(row => !!row)
        .reduce((acc, row, index, arr) => {
            console.log(row);
            const lastItem = last(acc);

            if (isStartsWithNumber(row)) {
                acc.push({
                    question: format(row.split('.').slice(1).join('.')),
                    number: parseInt(row),
                    options: [],
                    answers: [],
                });
            } else if (row.startsWith('o')) {
                lastItem.options.push(format(row.slice(1)));
            } else if (row.startsWith('')) {
                const answer = format(row.slice(1));
                lastItem.options.push(answer);
                lastItem.answers.push(answer);
            } else if (lastItem && lastItem.answers.length === 0) {
                lastItem.question = format(`${lastItem.question} ${row.trim()}`);
            } else if ((arr[index - 1]?.startsWith('') || arr[index - 1]?.startsWith('o')) && isStartsWithNumber(arr[index + 1])) {
                const lastOption = last(lastItem.options);
                const optionIndex = lastItem.options.indexOf(lastOption);
                const answerIndex = lastItem.answers.indexOf(lastOption);
                if (optionIndex >= 0) {
                    lastItem.options[optionIndex] = `${lastOption} ${format(row)}`;
                }
                if (answerIndex >= 0) {
                    lastItem.answers[answerIndex] = `${lastOption} ${format(row)}`;
                }
            }
            return acc;
        },[]))
    .then(data => writeFile('./dist/result.json', JSON.stringify(data, null, 2)));
