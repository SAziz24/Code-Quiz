// get all buttons and sections
const timeEl = document.getElementById("timeleft");
const questionEl = document.getElementById("question");
const titleEl = document.getElementById("title");
const answersEl = document.getElementById("answers");
const startBtn = document.getElementById("btn_start");
const resultEl = document.getElementById("result");
const initialsInput = document.getElementById("initials");
const submitBtn = document.getElementById("btn_submit");
const highScorePreSubmissionEl = document.getElementById("highscore_presubmission");
const hrlineEl = document.getElementById("hrline");

// declare global variables
let currentQuestion;
let answers;
let points = 0;
let highscore = {
    user:"",
    score:0
}
let secondsLeft;
let highscores = [];
let isCompleted = false;
// initialize question pool
const myQuestions = [
    {
        question: "Which built-in method calls a function for each element in the array?",
        answers: [
            "while()",
            "loop()",
            "forEach",
            "None of the above",
        ],
        correctAnswer: 3,
        
    },
    {
        question: "What is the correct JavaScript syntax to write Hello World ?",
        answers: [
            `System.out.printIn("Hello World)`,
            `printIn("Hello World)`,
            `document.write("Hello World)`,
            `response.write("Hello World)`
        ],
        correctAnswer: 3,
    },

    {
        question: "Which of the following are capabilities of functions in JavaScript?",
        answers: [
            "Accept parameters",
            "Accept parameters and Return a value",
            "Return a value"
            
        ],
        correctAnswer: 1,
    
    },
    {
        question: "  Which of the following best describes JavaScript?",
        answers: [
            " a low-level programming language",
            "a scripting language precompiled in the browser.",
            "a compiled scripting language.",
            " an object-oriented scripting language."
        ],
        correctAnswer: 3,
    }
];


submitBtn.addEventListener("click", function() {
    if(initialsInput.value ==="") {
        alert("Type in your initials.");
    } else {
        highscore.user = initialsInput.value;
        highscore.score = points;
        setHighScore(highscore);
        window.location = "./highscores.html";

    }
})

// Start Game Event Listener
startBtn.addEventListener("click", startQuiz);

answersEl.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches(".answer")) {
        var index = parseInt(element.getAttribute("id"), 10);
        if (currentQuestion.correctAnswer === index) {
            hrlineEl.setAttribute("style","margin: auto; width: 100%");
            resultEl.textContent = "Good Job! You got it right! 10 points added!"
            points += 10;
            
            setTimeout(() => {
                showNextQuestion();
            }, 1000);

        } else {
            hrlineEl.setAttribute("style","margin: auto; width: 100%");
            resultEl.textContent = `Wrong! Correct answer is ${currentQuestion.correctAnswer + 1}.'
            `
   
            
            secondsLeft -= 10;
            setTimeout(() => {
                showNextQuestion();
            }, 5000);
        }

    }

})

//next question on the screen
function showNextQuestion() {
    resultEl.textContent = "";
    let questionAnswersHTML = "";
    hrlineEl.setAttribute("style", "display:none");
    currentQuestion = myQuestions.shift();
    if (typeof currentQuestion == "object") {
        questionEl.textContent = currentQuestion.question;
        answers = currentQuestion.answers;


        for (var i = 0; i < currentQuestion.answers.length; i++) {
            questionAnswersHTML += `<p class="answer" id="${i}">${i + 1}. ${answers[i]}</p>`;
        }

        answersEl.innerHTML = questionAnswersHTML;
    
// No more questions
    } else {
        isCompleted = true;
    }


}

// Count Down
function startQuiz() {
    // Sets interval in variable
    startBtn.setAttribute("style", "display: none")
    secondsLeft = 75;
    getHighScore();
    showNextQuestion();
    var timerInterval = setInterval(function () {

        timeEl.textContent = `Time: ${secondsLeft}`;


        if (secondsLeft === 0 || isCompleted) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function end the quiz
            endQuiz(); 
        }
        secondsLeft--;
    }, 1000);
}

// End quiz function 
function endQuiz() {
    answersEl.innerHTML="";
    highScorePreSubmissionEl.setAttribute("style", "display:block");
    highscore.score = points;
    titleEl. textContent = "Quiz Completed!"
    questionEl.textContent = `Your score is ${points}, enter your name below.`
}

// Set high score (use local storage)
function setHighScore(hscore) {
    
    highscores.push(hscore);
    // ES6 syntax for sorting the array by a number typed property within object
    highscores.sort((a,b) => b.score - a.score);
    localStorage.setItem("highscores",JSON.stringify(highscores));

}
// read high score
function getHighScore() {
    if (JSON.parse(localStorage.getItem("highscores"))!==null) {
        highscores = JSON.parse(localStorage.getItem("highscores"));
    }
       
}

// initialize
highScorePreSubmissionEl.setAttribute("style", "display:none");
hrlineEl.setAttribute("style", "display:none");