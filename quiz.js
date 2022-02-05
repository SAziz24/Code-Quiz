const timeEl = document.getElementById("timeleft");
const questionEl = document.getElementById("questions");
const choice = Array.from(document.getElementsByClassName("choice-text"));
const btn = document.getElementsByClassName("btn");
 

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = []

let question = [
    {
        question: "The condition in an if/ else statement is enclosed within _______.",
        choice1: 'quotes',
        choice2:"curly brackets",
        choice3:"parenthesis",
        choice4:"square brackets",
        answer: 1 
    }, 
    {
        question:"Commonly used data types DO NOT INCLUDE",
        choice1:"strings",
        choice2:"booleans",
        choice3:"alerts",
        choice4:"numbers",
        answer: 3,
    },
    {
        question:"Arrays in JavaScripts can be used to store________.",
        choice1:"numbers and strings",
        choice2:"other arrays",
        choice3:"booleans",
        choice4:"all of the above",
        answer: 4,
    },
    {
        question:"String values must be enclosed within _______ when being assigned to variables.",
        choice1:"commas",
        choice2:"curly brackets",
        choice3:"quotes",
        choice4:"parenthesis",
        answer: 2,
    },
    {
        question:"A very useful took used during development and debugging for printing content to the debugger is ________.",
        choice1:"JavaScript",
        choice2:"terminal/bash",
        choice3:"for loops",
        choice4:"console.log",
        answer:3,
    }
]

//CONSTANTS
const SCORE_POINTS = 10
const MAX_QUESTIONS = 3

startQuiz = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...question]
    getNewQuestion()

}

getNewQuestion = () => {
    if(availableQuestions.length ===0 || questionCounter >= MAX_QUESTIONS ){
        //go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questions.innerText = currentQuestion.question;

    choice.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
     acceptingAnswers = true;
};

choice.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selecteChoice = e.target;
        const selectedAnswer = selecteChoice.dataset["number"];
        console.log(selectedAnswer);

        getNewQuestion();
    });
});

startQuiz();

function startQuiz () {
    btn.setAttribute ("style","display: none")
    secondLeft = 75;
    getHighScore ();
    showNextQuestion ();
    var timerInterval = setInterval (function(){
        timeEl.textcontent = 'Time: ${secondsLeft}';

        if (secondsLeft ===0 || iscompleted) {
            clearInterval(timerInterval);
            endquiz();
        }
        secondsLeft --;
    }, 1000);
}



