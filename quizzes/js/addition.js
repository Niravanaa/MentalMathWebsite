// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generateButton");
    const validateButton = document.getElementById("validateButton");
    const clearButton = document.getElementById("clearButton");
    const viewAnswersButton = document.getElementById("viewAnswersButton");
    const operationBoxes = document.getElementById("operationBoxes");
    const answerDisplay = document.getElementById("answerDisplay");
    const timerDisplay = document.getElementById("timer");

    let operations = [];
    let timerInterval;
    let isTimerRunning = false;

    // Function to generate random number within a range
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function to generate a new sequence of addition operations
    function generateQuestions() {
        const numQuestions = parseInt(document.getElementById("numQuestions").value);
        const minNumber = parseInt(document.getElementById("minNumber").value);
        const maxNumber = parseInt(document.getElementById("maxNumber").value);

        operations = [];
        operationBoxes.innerHTML = "";

        for (let i = 0; i < numQuestions; i++) {
            const num1 = getRandomNumber(minNumber, maxNumber);
            const num2 = getRandomNumber(minNumber, maxNumber);
            const result = num1 + num2;

            const operationBox = document.createElement("div");
            operationBox.classList.add("border", "p-4", "text-center");
            operationBox.style.display = "block"; // Set display to block for vertical layout
            operationBox.innerHTML = `<p>${num1}</p><p>+</p><p>${num2}</p><p>=</p>`;

            const answerInput = document.createElement("input");
            answerInput.type = "number";
            answerInput.classList.add("border", "px-2", "py-1");

            // Adjust input box width for mobile devices
            answerInput.classList.add("w-full"); // Set input box width to full width on small screens

            answerInput.style.display = "block"; // Set display to block for vertical layout
            operationBox.appendChild(answerInput);

            operations.push({ num1, num2, result, answerInput });
            operationBoxes.appendChild(operationBox);
        }
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
                clearButton.disabled = false; // Enable Clear and View Answers
                viewAnswersButton.disabled = false;
                alert("Time is up! You cannot submit answers until you press the 'Validate' button.");
                operations.forEach(operation => {
                    operation.answerInput.disabled = true; // Disable answer input after time is up
                });
            }
        }, 1000);
    }

    // Event listener for the "Generate and Start Timer" button
	generateButton.addEventListener("click", function () {
		if (!isTimerRunning) {
			isTimerRunning = true;
			generateQuestions();
			const timeLimit = parseInt(document.getElementById("timeLimit").value);
			startTimer(timeLimit);
			validateButton.disabled = true;
			clearButton.disabled = true;
			viewAnswersButton.disabled = true;
			operations.forEach(operation => {
				operation.answerInput.disabled = false; // Enable answer input after generating
			});
		} else {
			alert("You can only generate new questions after the timer has finished.");
		}
	});

    // Event listener for the "Validate" button
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
				operation.answerInput.disabled = true; // Disable answer input after validation
			});

			const feedback = document.createElement("p");
			feedback.textContent = `You got ${correctCount} out of ${operations.length} correct.`;
			answerDisplay.innerHTML = "";
			answerDisplay.appendChild(feedback);
		}
	});

    // Event listener for the "Clear" button
    clearButton.addEventListener("click", function () {
        if (!isTimerRunning) {
            operations.forEach(operation => {
                operation.answerInput.value = "";
                operation.answerInput.classList.remove("border-red-500", "border-green-500");
            });
            answerDisplay.innerHTML = "";
        }
    });

    // Event listener for the "View Answers" button
    viewAnswersButton.addEventListener("click", function () {
        if (!isTimerRunning) {
            answerDisplay.innerHTML = "";
            operations.forEach(operation => {
                const answerText = document.createElement("p");
                answerText.textContent = `${operation.num1} + ${operation.num2} = ${operation.result}`;
                answerDisplay.appendChild(answerText);
            });
        }
    });
});
