// variables
const viewScore = document.getElementById('scoreboard')
const startButton = document.querySelector('#start')
const nextButton = document.querySelector('.next')
const quizTimer = document.querySelector('#timer')
const quizcontainerEl = document.querySelector('.quizcontainer')
const questionText = document.querySelector('.Question')
const answerEl = document.querySelector('.answers')
const seeScore = document.querySelector('.finish')
const questionContainerEl = document.querySelector('.questionContainer')
const initialsInputEl = document.querySelector('.initialsInput')
let submittedInital = document.getElementById('initial').value;
const submitbtn = document.querySelector('.submit')
const myForm = document.getElementById('myForm')
const seeScoreboard = document.querySelector('.scoreboard')
let showInitial = document.querySelector('.yourInitial')
let showScore = document.querySelector('.yourScore')

let shuffledQuestions, currentQuestionIndex
// function to start timer and and question, when click the start button 


// function to start timer

startButton.addEventListener("click", gameTimer)

let timer = 50;

function gameTimer() {

    let startTimer = setInterval(function () {
        quizTimer.textContent = timer--;
        if (timer === 0) {
            // stop timer
            clearInterval(startTimer)
            // notify function to alert"Game Over"
            endofQuestion()
        }
    }, 1000)
}



// click start, then hide start button, show quizcontainer, setting next question

startButton.addEventListener("click", startQuiz)

function startQuiz() {
    startButton.classList.add('hide')
    quizcontainerEl.classList.remove('hide')
    seeScore.classList.add('hide')
    initialsInputEl.classList.add('hide')
    // sort questions by random order

    shuffledQuestions = qandas.sort(() => Math.random() - 0.5)

    currentQuestionIndex = 0;
    setNextQuestion();

    console.log(shuffledQuestions)
}



// questions and answers variables for quiz

const quiz = [
    {
        question: "Javascript cannot change the value of a source (src).",
        answers:
            [{
                text: "true",
                correct: false
            }, {
                text: "false",
                correct: true
            },    

            ]
    }, {
        question: "Webpages use CSS to style which properties?",
        answers:
            [{
                text: "color",
                correct: false
            }, {
                text: "font",
                correct: false
            }, {
                text: "layout",
                correct: false
            }, {
                text: "all of the above",
                correct: true
            },

            ]
    }, {
        question: ,
        answers:
            [{
                text: ";",
                correct: false
            }, {
                text: "",
                correct: true
            }, {
                text: "",
                correct: false
            }, {
                text: "",
                correct: false
            },

            ]
    }, {
        question: "",
        answers:
            [{
                text: "",
                correct: true
            }, {
                text: "",
                correct: false
            }, {
                text: "",
                correct: false
            }, {
                text: "",
                correct: false
            },

            ]
    }, {
        question: "",
        answers:
            [{
                text: "",
                correct: true
            }, {
                text: "",
                correct: false
            }, {
                text: "",
                correct: false
            }, {
                text: "",
                correct: false
            },
        ]
    }, {
        question: ,
        answers:
            [{
                text: ";",
                correct: false
            }, {
                text: "",
                correct: true
            }, {
                text: "",
                correct: false
            }, {
                text: "",
                correct: false
            },
        ]
    }, {
        question: ,
        answers:
            [{
                text: ";",
                correct: false
            }, {
                text: "",
                correct: true
            }, {
                text: "",
                correct: false
            }, {
                text: "",
                correct: false
            },
        ]
    }, {
        question: ,
        answers:
            [{
                text: ";",
                correct: false
            }, {
                text: "",
                correct: true
            }, {
                text: "",
                correct: false
            }, {
                text: "",
                correct: false
            },
        ]
    }, {
        question: ,
        answers:
            [{
                text: ";",
                correct: false
            }, {
                text: "",
                correct: true
            }, {
                text: "",
                correct: false
            }, {
                text: "",
                correct: false
            },
        ]
    }, {
        question: ,
        answers:
            [{
                text: ";",
                correct: false
            }, {
                text: "",
                correct: true
            }, {
                text: "",
                correct: false
            }, {
                text: "",
                correct: false
            },


            ]
    }

]


// display new question.
function setNextQuestion() {
    resetQuestion()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}



function showQuestion() {

    questionText.innerText = shuffledQuestions[currentQuestionIndex].question;

    shuffledQuestions[currentQuestionIndex].answers.forEach(answer => {
        let button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('answer')

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerEl.appendChild(button)
    })

}
// delete and reset previous questions
function resetQuestion() {
    clearStatus(document.body)
    nextButton.classList.add('hide')
    while (answerEl.firstChild) {
        answerEl.removeChild(answerEl.firstChild)
    }
}

//check the answers and calculate scores
answerEl.addEventListener("click", selectAnswer)

function selectAnswer(e) {

    var cnt;
    let selectedAnswer = e.target;
    let correct = selectedAnswer.dataset.correct;
    console.log("selectedAnswer = " + selectedAnswer + "\n");
    console.log("correct = " + correct + "\n");



    setStatus(document.body, correct)
    cnt = 0;
    Array.from(answerEl.children).forEach(button => {
        setStatus(button, button.dataset.correct)
        console.log("foreach cnt = "+cnt+"\n")
        cnt++;

    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        endofQuestion()
    }
}


let score = 0;
function setStatus(element, correct) {
    console.log("Called setStatus" + "\n");
    clearStatus(element)
    console.log("setStaus>score = " + score + "\n");
    console.log("correct = " + correct + "\n");


    if (correct) {
        score += 20;
        element.classList.add('correct')
    }
    else {
        timer--;
        element.classList.add('wrong')
    }
}




function clearStatus(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
}
)


function endofQuestion() {
    questionContainerEl.classList.add('hide')
    seeScore.classList.remove('hide')
    clearInterval(gameTimer)
}

seeScore.addEventListener("click", () => {
    seeScore.classList.add('hide')
    initialsInputEl.classList.remove('hide')
    seeScoreboard.classList.add('hide')

})

myForm.addEventListener("submit", finalScore)

function finalScore(e) {
    e.preventDefault();
    submittedInital = document.getElementById('initial').value;
    localStorage.setItem("ID", submittedInital)
    let myName = localStorage.getItem("ID");
    console.log(submittedInital);
    showInitial.innerHTML = myName;
    showScore.textContent = score * 20;
    seeScoreboard.classList.remove('hide')
    myForm.classList.add('hide')
}

// viewScore.addEventListener('click', seeScores)

// function seeScore() {
//     let see = document.querySelector('.hide')
//     let highScore = localStorage.getItem("ID")
//     see.classList.remove("hide")
//     see.innerText = highScore;

// }





// GIVEN I am taking a code quiz

// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score
