"use strict";

fetch(
    "https://raw.githubusercontent.com/BezzubovEgor/test-filler/main/dist/spo.json"
)
    .then(function (data) {
        return data.json();
    })
    .then(function (data) {
        console.log('amount of loaded questions:', data.length);
        return document
            .querySelectorAll(".que > .content > .qtext")
            .forEach(function (item) {
                var itemText = item.textContent.trim().replace(/['"«»`:,.-\?\!]/g, "");
                var question = data.find(function (_ref) {
                    var question = _ref.question;
                    return question.toLowerCase().includes(itemText.toLowerCase());
                }) || data.find(function (_ref) {
                    var question = _ref.question;
                    return itemText.toLowerCase().includes(question.toLowerCase());
                });

                if (question) {
                    item.parentNode.querySelectorAll("label").forEach(function (label) {
                        var labelText = label.textContent.trim().replace(/['"«»`:,.-\?\!]/g, "");

                        if (
                            question.answers.find(function (answer) {
                                return answer.toLowerCase().includes(labelText.toLowerCase());
                            }) || question.answers.find(function (answer) {
                                return labelText.toLowerCase().includes(answer.toLowerCase());
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
