//Get Elements
const startScreen = document.querySelector("#start");
const startBtn = document.querySelector("#start-btn");
const infoBox = document.querySelector(".info-box");
const exitBtn = document.querySelector(".quit");
const continueBtn = document.querySelector(".restart");
const quizBox = document.querySelector(".quiz-box");
const endBox = document.querySelector("#quiz-end");
const submitBtn = document.querySelector("#save-score");
const initialsText = document.querySelector("#initials");
var existing = localStorage.getItem('results');
existing = existing ? existing.split(',') : [];
var queCount = 0;
var counter = 60;
var score = 0;

//If Continue Button Clicked
continueBtn.onclick = ()=>{
    infoBox.classList.add("hide");
    startScreen.classList.remove("hide");
};

//If Start Button Clicked
startBtn.onclick = () => {
    function countdown(){
        counter--;
            if (counter === 0){
                clearInterval(startCountdown)
                quizEnd()
            };
    let timeRem = document.querySelector("#time-rem");
    let timeTag = "<span>Time Left: "+ counter +"</span>"
    timeRem.innerHTML = timeTag;
    };
    var startCountdown = setInterval(countdown, 1000);
    startScreen.classList.add("hide");
    quizBox.classList.remove("hide");
    showQuestions(queCount)
};

//Get Questions and Options from Array
function showQuestions(index){
    if (queCount>=10){
        return;
    }
    const queText = document.querySelector(".que-text");
    const optionList = document.querySelector("#choices");
    let queTag = "<span>"+ questions[index].numb + ". "+ questions[index].question +"</span>";
    let optionTag = '<div class="option">'+ questions[index].options[0] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[1] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[2] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[3] + '<span></span></div>'
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    const option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//Show Next Question When Question is answered
function optionSelected(answer){
    if (queCount>=10){
        return;
    }
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    if(userAns == correctAns){
        console.log("Answer is Correct");
        const response = document.querySelector("#response");
        response.innerHTML = '<div id="response"><span>Correct!</span></div>';
        setTimeout(nextQuestion, 500)
        score += 1

    }else{
        console.log("Answer is Wrong");
        const response = document.querySelector("#response");
        response.innerHTML = '<div id="response"><span>Wrong!</span></div>';
        setTimeout(nextQuestion, 500)
        counter -= 5
    }
}
function nextQuestion(){
    queCount++;
    if(queCount == 10){
        
        quizEnd()
    };
    showQuestions(queCount);
    const response = document.querySelector("#response");
    response.innerHTML = '<div id="response"><span></span></div>';
    }

//End Quiz if All Questions Completed or Timer Runs out
function quizEnd(){
    quizBox.classList.add("hide");
    endBox.classList.remove("hide");
    const scoreText = document.querySelector(".score");
    let scoreTag = '<h3 class="score"> Your score was '+ score +' out of 10!</h3>';
    scoreText.innerHTML = scoreTag; 
}
//Submit Initials
submitBtn.onclick = () => {
    let initials = initialsText.value;
    //Store Initials and Score in Local Storage
    var resultsDataObj = {
        initials: initials,
        score: score
    }
    localStorage.setItem((localStorage.length+1), JSON.stringify(resultsDataObj));
    initialsText.value = ""
    location.reload();
}

// questions and answers variables for quiz

let questions = [
    {
        numb: 1,
        question: "Javascript cannot change the value of a source (src).",
        answer: "false",
        options: [
            "true",
            "false",
            " ",
            " ",
        ]
    },
    {
        numb: 2,
        question: "Webpages use CSS to style which properties?",
        answer: "all of the above",
        options:[
            "color",
            "font",
            "layout",
            "all of the above",
        ]
    }, 
    {
        numb: 3,
        question: "In HTML what does the alt attribute specify for an image?",
        answer: "alternate text",
        options: [
            "altruistic concern",
            "alternate text",
            "altitudinous elevation",
            "none of the above",
        ]
    }, 
    {
        numb: 4,
        question: "Which of the following is not a CSS function?",
        answer: "img().",
        options: [
            "attr().",
            "calc().",
            "img().",
            "var().",
        ]
    }, 
    {
        numb: 5,
        question: "In an HTML element the class name of an attribute is case sensitive.",
        answer: "true",
        options: [
            "true",
            "false",
            " ",
            " ",
        ]
    }, 
    {
        numb: 6,
        question: "In an array index the first element is?",
        answer: "0",
        options: [
            "1",
            "AA",
            "0",
            "A",
        ]
    }, 
    {
        numb: 7,
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: [
            "Hyper Text Markup Language",
            "Hyper Terminal Making Links",
            "Highland Trade Markup List",
            "none of the above",
        ]
    }, 
    {
        numb: 8,
        question: "The most common way to add CSS is:",
        answer: "external",
        options: [
            "external",
            "internal",
            "inline",
            "incline",
        ]
    }, 
    {
        numb: 9,
        question: "HTML elements include:",
        answer: "all of the above",
        options: [
            "heading",
            "paragraph",
            "body",
            "all of the above",
        ]
    }, 
    {
        numb: 10,
        question: "In Javascript HTML elements can be hidden by changing the ___________ style.",
        answer: "const",
        options: [
            "string",
            "const",
            "display",
            "syntax",
        ]
    },

]
