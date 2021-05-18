const Q_REG = /['"«»`]/g;

function format(str) {
    return str.trim().replace(/['"«»`]/g, '');
}

document
    .querySelectorAll('.que > .content > .qtext')
    .forEach(item => {
        const itemText = item.textContent.trim().replace(/['"«»`]/g, '');
        const question = data.find(({ question }) => question.includes(itemText));
        if (question) {
            item.parentNode.querySelectorAll('label').forEach(label => {
                const labelText = label.textContent.trim().replace(/['"«»`]/g, '');
                console.log(labelText, question.answers)
                if (question.answers.find(answer => answer.includes(labelText))) {
                    label.click();
                }
            });
        } else {
            console.log(item.textContent.trim())
        }
    })
