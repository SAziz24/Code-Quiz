const rankinglistEl = document.getElementById("highscoreslist");
const goBackBtn = document.getElementById("btn_goback");
const clearHighscoresBtn = document.getElementById("btn_clearscores");
let highscores = [];
let highscoresHTML = "";


function getHighScores() {
    if (JSON.parse(localStorage.getItem("highscores")) !== null) {
        highscores = JSON.parse(localStorage.getItem("highscores"));
    }

}

getHighScores();
for (let i = 0; i < highscores.length; i++) {
    highscoresHTML += `<li>${highscores[i].user} -- ${highscores[i].score}</li>`
}
rankinglistEl.innerHTML = highscoresHTML;

goBackBtn.addEventListener("click", function () {
    window.location = "./index.html";
})

clearHighscoresBtn.addEventListener("click", function () {
    localStorage.removeItem("highscores");
    rankinglistEl.innerHTML = "";
})