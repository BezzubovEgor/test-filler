"use strict";

fetch(
    "https://raw.githubusercontent.com/BezzubovEgor/test-filler/main/dist/result.json"
)
    .then(function (data) {
        return data.json();
    })
    .then(function (data) {
        console.log('amount of loaded questions:', data.length);
        return document
            .querySelectorAll(".que > .content > .qtext")
            .forEach(function (item) {
                var itemText = item.textContent.trim().replace(/['"«»`]/g, "");
                var question = data.find(function (_ref) {
                    var question = _ref.question;
                    return question.includes(itemText);
                });

                if (question) {
                    item.parentNode.querySelectorAll("label").forEach(function (label) {
                        var labelText = label.textContent.trim().replace(/['"«»`]/g, "");

                        if (
                            question.answers.find(function (answer) {
                                return answer.includes(labelText);
                            })
                        ) {
                            label.click();
                        }
                    });
                } else {
                    console.log(item.textContent.trim());
                }
            });
    })
    .then(() => console.log('success'));
