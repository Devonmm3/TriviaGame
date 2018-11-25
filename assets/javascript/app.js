$(document).ready(fuction) {
    //need a variable for the timer, that counts down from 60 seconds.
    var answerTimer = 60000;
    var quizArea = $("#quiz");
    //need to display the results when the timer runs out; number of correct, number of incorrect, number answered.
    var correctAnswer = 0;
    var incorrectAnswer = 0;
    var questionsAnswered = 0;



    //need array to hold the player's answer
    var answerSelected = []

    //need an array for holding the questions, the answer options and the right answer for each question. 
    var questionsAndAnswers = [{
            question: "What is Mr. Filch's cats name?",
            answerChoices: ["Fluffy", "Hedwig", "Mrs. Norris", "Scabbers"],
            rightAnswer: 2
        },
        {
            question: "How many children are in the Weasley Family?",
            answerChoices: ["11", "3", "5", "7"],
            rightAnswer: 3
        },
        {
            question: "Who is Harry Potter's Godfather?",
            answerChoices: ["Remus Lupin", "Albus Dumbledore", "Vernan Dursely", "Sirius Black"],
            rightAnswer: 3
        },
        {
            question: "Who is the current head of Gryffindor House?",
            answerChoices: ["Godric Gryffindor", "Miverna McGonagall", "Tom Riddle", "Dolores Umbridge"],
            rightAnswer: 1
        },
        {
            question: "What position does Harry play in Quidditch?",
            answerChoices: ["Chaser", "Seeker", "Chaser", "Beater"],
            rightAnswer: 1
        },
        {
            question: "What street to the Durselys live on?",
            answerChoices: ["Ablus Avenue", "Market Street", "Privitt Dr", "Privitt Ave"],
            rightAnswer: 2
        },
        {
            question: "What is Harry's middle name?",
            answerChoices: ["Ron", "Alexander", "James", "Sirius"],
            rightAnswer: 2
        },
        {
            question: "What is Harry's Patronus?",
            answerChoices: ["A Crow", "A Stag", "A Shark", "A Horse"],
            rightAnswer: 1,
        }

    ]
};

//user clicks start button, the questions are diplayed and the timer begins counting down.
function startGame() {
    $("#start").on("click", function () {
        console.log(rightAnswer);
    })
}

function runTimer() {
    increment = setInterval(decrement, 1000)
}

function decrement() {
    timeLeft--;
    $("#timeLeft").html("Time Remaining:" + timeLeft + " Seconds");
    if (timeLeft === 0) {
        stopTimer();
        answerSelected.length = 0;
        //need to hold user answers and record them
        var selectedGuess = ("#responses")

    }
    //function to display the given responses at the end of the game
}
//user is able to choose one of the 4 answers and only one can be selected.
function
//when the timer hits 0, the results are displayed.  The results are correct answers, incorrect answers, and the number of questions answered. 
//Need a function to call the results to the "quiz" div in the html
//the timer resets and the game restarts.
//
//timer decreases by 1000