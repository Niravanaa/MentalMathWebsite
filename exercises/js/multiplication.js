document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generateButton");
    const validateButton = document.getElementById("validateButton");
    const clearButton = document.getElementById("clearButton");
    const viewAnswersButton = document.getElementById("viewAnswersButton");
    const operationBoxes = document.getElementById("operationBoxes");
    const answerDisplay = document.getElementById("answerDisplay");

    let operations = [];

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateButton.addEventListener("click", function () {
        const numQuestions = parseInt(document.getElementById("numQuestions").value);
        const minNumber = parseInt(document.getElementById("minNumber").value);
        const maxNumber = parseInt(document.getElementById("maxNumber").value);

        operations = [];
        operationBoxes.innerHTML = "";

        for (let i = 0; i < numQuestions; i++) {
            const num1 = getRandomNumber(minNumber, maxNumber);
            const num2 = getRandomNumber(minNumber, maxNumber);
            const result = num1 * num2;

            const operationBox = document.createElement("div");
            operationBox.classList.add("border", "p-4", "text-center");
            operationBox.textContent = `${num1} × ${num2} = `;

            const answerInput = document.createElement("input");
            answerInput.type = "number";
            answerInput.classList.add("border", "px-2", "py-1");

            // Adjust input box width for mobile devices
            answerInput.classList.add("w-full"); // Set input box width to full width on small screens

            operationBox.appendChild(answerInput);

            operations.push({ num1, num2, result, answerInput });
            operationBoxes.appendChild(operationBox);
        }
    });

    validateButton.addEventListener("click", function () {
        let correctCount = 0;

        operations.forEach(operation => {
            const userAnswer = parseInt(operation.answerInput.value);
            if (!isNaN(userAnswer) && userAnswer === operation.result) {
                operation.answerInput.classList.add("border-green-500");
                operation.answerInput.classList.remove("border-red-500");
                correctCount++;
            } else {
                operation.answerInput.classList.add("border-red-500");
                operation.answerInput.classList.remove("border-green-500");
            }
        });

        const feedback = document.createElement("p");
        feedback.textContent = `You got ${correctCount} out of ${operations.length} correct.`;
        answerDisplay.innerHTML = "";
        answerDisplay.appendChild(feedback);
    });

    clearButton.addEventListener("click", function () {
        operations.forEach(operation => {
            operation.answerInput.value = "";
            operation.answerInput.classList.remove("border-red-500", "border-green-500");
        });
        answerDisplay.innerHTML = "";
    });

    viewAnswersButton.addEventListener("click", function () {
        answerDisplay.innerHTML = "";
        operations.forEach(operation => {
            const answerText = document.createElement("p");
            answerText.textContent = `${operation.num1} × ${operation.num2} = ${operation.result}`;
            answerDisplay.appendChild(answerText);
        });
    });
});
