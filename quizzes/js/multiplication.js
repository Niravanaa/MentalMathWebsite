document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generateButton");
    const validateButton = document.getElementById("validateButton");
    const clearButton = document.getElementById("clearButton");
    const viewAnswersButton = document.getElementById("viewAnswersButton");
    const operationBoxes = document.getElementById("operationBoxes");
    const answerDisplay = document.getElementById("answerDisplay");
    const timerDisplay = document.getElementById("timer"); // Added timerDisplay

    let operations = [];
    let timerInterval;
    let isTimerRunning = false;

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function to update the timer display
    function updateTimerDisplay(remainingTime) {
        timerDisplay.textContent = `Time left: ${remainingTime} seconds`;
    }

    // Function to start a timer with a given time limit
    function startTimer(timeLimit) {
        let remainingTime = timeLimit;

        updateTimerDisplay(remainingTime);

        timerInterval = setInterval(() => {
            remainingTime--;
            updateTimerDisplay(remainingTime);

            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = "Time's up!";
                isTimerRunning = false;
                validateButton.disabled = false;
                clearButton.disabled = false;
                viewAnswersButton.disabled = false;
                alert("Time is up! You cannot submit answers until you press the 'Validate' button.");
                operations.forEach(operation => {
                    operation.answerInput.disabled = true;
                });
            }
        }, 1000);
    }

    generateButton.addEventListener("click", function () {
        const numQuestions = parseInt(document.getElementById("numQuestions").value);
        const minNumber = parseInt(document.getElementById("minNumber").value);
        const maxNumber = parseInt(document.getElementById("maxNumber").value);
        const timeLimit = parseInt(document.getElementById("timeLimit").value); // Added time limit

        operations = [];
        operationBoxes.innerHTML = "";

        for (let i = 0; i < numQuestions; i++) {
            const num1 = getRandomNumber(minNumber, maxNumber);
            const num2 = getRandomNumber(minNumber, maxNumber);
            const result = num1 * num2;

            const operationBox = document.createElement("div");
            operationBox.classList.add("border", "p-4", "text-center");
			operationBox.style.display = "block";
            operationBox.innerHTML = `<p>${num1}</p><p>×</p><p>${num2}</p><p>=</p>`;

            const answerInput = document.createElement("input");
            answerInput.type = "number";
            answerInput.classList.add("border", "px-2", "py-1");
            answerInput.classList.add("w-full"); // Set input box width to full width on small screens

            operationBox.appendChild(answerInput);

            operations.push({ num1, num2, result, answerInput });
            operationBoxes.appendChild(operationBox);
        }

        // Start the timer when generating questions
        if (!isTimerRunning) {
            isTimerRunning = true;
            startTimer(timeLimit);
            validateButton.disabled = true;
            clearButton.disabled = true;
            viewAnswersButton.disabled = true;
            operations.forEach(operation => {
                operation.answerInput.disabled = false;
            });
        } else {
            alert("You can only generate new questions after the timer has finished.");
        }
    });

    validateButton.addEventListener("click", function () {
        if (!isTimerRunning) {
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
                operation.answerInput.disabled = true;
            });

            const feedback = document.createElement("p");
            feedback.textContent = `You got ${correctCount} out of ${operations.length} correct.`;
            answerDisplay.innerHTML = "";
            answerDisplay.appendChild(feedback);
        }
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
