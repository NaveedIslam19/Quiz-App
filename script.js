let Questions = [
    {
        Question: "Which country is lowest in the world and rising sea level is the biggest threat to its existence?",
        answers: [
            { text: "Indonesia", correct: false },
            { text: "Maldives", correct: true },
            { text: "South Africa", correct: false },
            { text: " Netherlands", correct: false },
        ]
    },

    {
        Question: "Which country is surrounded by South Africa from all the sides?",
        answers: [
            { text: "Gabon", correct: false },
            { text: "Maldives", correct: false },
            { text: " Laos", correct: true },
            { text: " Niue", correct: false },
        ]
    },

    {
        Question: "Which region of the Moon is known as “Dark side”?",
        answers: [
            { text: "Equator", correct: false },
            { text: "South Pole", correct: true },
            { text: "North Pole", correct: false },
            { text: "Great Spot", correct: false },
        ]
    },

    {
        Question: "Africa’s largest tropical rain-forest is Salonga National Park. It is located in",
        answers: [
            { text: "Nigeria", correct: false },
            { text: "Kenya", correct: false },
            { text: "South Africa", correct: false },
            { text: " DR Congo", correct: true },
        ]
    }
];

const question = document.querySelector(".question h1");
const Answers = document.querySelector(".answers");
const nextBtn = document.querySelector(".next-btn")

let currentQuestionIndex = 0;
let score = 0;

function statQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextBtn.innerHTML = "Next"
    showQuestion();
};

function showQuestion() {
    resetState()
    let currentQuestion = Questions[currentQuestionIndex];
    let QuestionNo = currentQuestionIndex + 1;
    question.innerHTML = QuestionNo + ". " + currentQuestion.Question;

    currentQuestion.answers.forEach(elem => {
        let button = document.createElement("button");
        button.classList.add("btn");
        button.innerHTML = elem.text;
        Answers.appendChild(button)
        if (elem.correct) {
            button.dataset.correct = elem.correct
        }
        button.addEventListener("click", selectAnswer)

    });
}

function selectAnswer(e) {
    let selectBtn = e.target;
    isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct")
        score++;
    } else {
        selectBtn.classList.add("incorrect")
    }

    Array.from(Answers.children).forEach(answer => {
        if (answer.dataset.correct === "true") {
            answer.classList.add("correct")
            nextBtn.style.display = "block"
        }
        answer.disabled = true;
    })
};

nextBtn.addEventListener("click", function () {
    if (currentQuestionIndex < Questions.length) {
        handleNextQuestion();
    } else {
        statQuiz();
    }
})

function resetState() {
    nextBtn.style.display = "none"
    while (Answers.firstChild) {
        Answers.removeChild(Answers.firstChild);
    }
}

function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < Questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState()
    question.innerHTML = `You scored ${score} out of ${Questions.length}`;
    nextBtn.innerHTML = "Start Again";
    nextBtn.style.display = "block";
}


statQuiz()