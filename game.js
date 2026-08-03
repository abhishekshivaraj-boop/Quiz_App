const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionText = document.getElementById("questionText");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const questions = [
    {
        question: "What is the capital of France?",
        choice1: "London",
        choice2: "Paris",
        choice3: "Berlin",
        choice4: "Madrid",
        answer: 2
    },
    {
        question: "Which language runs in a web browser?",
        choice1: "Java",
        choice2: "C",
        choice3: "Python",
        choice4: "JavaScript",
        answer: 4
    },
    {
        question: "What does CSS stand for?",
        choice1: "Central Style Sheets",
        choice2: "Cascading Style Sheets",
        choice3: "Cascading Simple Sheets",
        choice4: "Cars SUVs Sailboats",
        answer: 2
    }
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html');
    }

    questionCounter++;
    questionText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

const incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

startGame();

