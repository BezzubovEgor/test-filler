fetch('https://raw.githubusercontent.com/BezzubovEgor/test-filler/main/dist/result.json')
    .then(data => data.json())
    .then((data) => document
        .querySelectorAll('.que > .content > .qtext')
            .forEach(item => {
                const itemText = item.textContent.trim().replace(/['"«»`]/g, '');
                const question = data.find(({ question }) => question.includes(itemText));
                if (question) {
                    item.parentNode.querySelectorAll('label').forEach(label => {
                        const labelText = label.textContent.trim().replace(/['"«»`]/g, '');
                        if (question.answers.find(answer => answer.includes(labelText))) {
                            label.click();
                        }
                    });
                } else {
                    console.log(item.textContent.trim())
                }
            })
    );
