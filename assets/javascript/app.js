// Model object/namespace - handles "data"
// contains questions array
var MODEL = {
  correct: 0,
  incorrect: 0,
  missed: 0,
  timeLeft: 10,
  increment: null,
  answerTimeout: 2000,
  userAnswer: [],
  questionCounter: 0,
  questions: [
    {
      question: "What is Mr. Filch's cats name?",
      choices: ["Fluffy", "Hedwig", "Mrs. Norris", "Scabbers"],
      choicesAnswer: 2
    },
    {
      question: "How many children are in the Weasley Family?",
      choices: ["11", "3", "5", "7"],
      choicesAnswer: 3
    },
    {
      question: "Who is Harry Potter's Godfather?",
      choices: [
        "Remus Lupin",
        "Albus Dumbledore",
        "Vernan Dursely",
        "Sirius Black"
      ],
      choicesAnswer: 3
    },
    {
      question: "Who is the current head of Gryffindor House?",
      choices: [
        "Godric Gryffindor",
        "Miverna McGonagall",
        "Tom Riddle",
        "Dolores Umbridge"
      ],
      choicesAnswer: 1
    },
    {
      question: "What position does Harry play in Quidditch?",
      choices: ["Chaser", "Seeker", "Chaser", "Beater"],
      choicesAnswer: 1
    },
    {
      question: "What street to the Durselys live on?",
      choices: ["Ablus Avenue", "Market Street", "Privitt Dr", "Privitt Ave"],
      choicesAnswer: 2
    },
    {
      question: "What is Harry's middle name?",
      choices: ["Ron", "Alexander", "James", "Sirius"],
      choicesAnswer: 2
    },
    {
      question: "What is Harry's Patronus?",
      choices: ["A Crow", "A Stag", "A Shark", "A Horse"],
      choicesAnswer: 1
    }
  ]
};

// View object/namespace - handles DOM-related changes
var VIEW = {
  displayStart: function() {
    $("#content").append(
      '<a href="#" class="btn btn-primary btn-lg" id="start-button">' +
        "Start" +
        "</a>"
    );
  },
  displayTimer: function() {
    $("#time-left").html("Time remaining: " + MODEL.timeLeft + " seconds");
  },
  emptyContent: function() {
    $("#content").empty();
  },
  displayQuestion: function() {
    var questions = MODEL.questions;
    var questionCounter = MODEL.questionCounter;

    VIEW.clearQuestion();
    $(".questionY").html(questions[questionCounter].question);
    VIEW.createRadios();
    $("#submit").append(
      '<button type="submit" class="btn btn-default" id="submit-button">' +
        "Submit" +
        "</button>"
    );
  },
  clearQuestion: function() {
    var qDiv = $(".questionY");
    qDiv.empty();

    var aDiv = $("#responses");
    aDiv.empty();

    var submitDiv = $("#submit");
    submitDiv.empty();

    VIEW.emptyContent();
  },
  createRadios: function() {
    var questions = MODEL.questions;
    var questionCounter = MODEL.questionCounter;
    var responseOptions = $("#responses");
    responseOptions.empty();

    for (var i = 0; i < questions[questionCounter].choices.length; i++) {
      responseOptions.append(
        '<label><input type="radio" name="optionsRadios" id="optionsRadios2" value="' +
          [i] +
          '"><div class="HPotter-opt">' +
          questions[questionCounter].choices[i] +
          "</div></input><br></label>"
      );
    }
  },
  displayCorrect: function() {
    $("#content").append(
      "<h3>" + "You were right!! Ten points to Gryffindor!" + "</h3>"
    );
  },
  displayOutOfTime: function(correctAnswer) {
    $("#content").append(
      "<h3>" +
        "You need a time turner!" +
        "</h3><br><br><h3>" +
        "The right answer is : " +
        correctAnswer +
        "</h3>"
    );
  },
  displayIncorrect: function(correctAnswer) {
    $("#content").append(
      "<h3>" +
        "Wrong! Detention in the Forbidden Forest for you! " +
        "</h3><br><br><h3>" +
        "The right answer was: " +
        correctAnswer +
        "</h3>"
    );
  },
  displayResult: function() {
    $("#time-left").html("Results");
  },
  displayEndPage: function() {
    VIEW.clearQuestion();
    $("#content").append(
      "<h3>" +
        "Correct answers: " +
        MODEL.correct +
        "</h3><br><h3>" +
        "Incorrect answers: " +
        MODEL.incorrect +
        "</h3><br><h3>" +
        "Skipped questions: " +
        MODEL.missed +
        '</h3><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' +
        "Restart Game" +
        "</a>"
    );
  }
};

// Controller object/namespace - handles actions involving both Model and View and other supporting actions
var CONTROLLER = {
  init: function() {
    VIEW.displayStart();

    // Adds a click listener for dynamically-added "#start-button"
    $(document).on("click", "#start-button", function(event) {
      event.preventDefault();
      CONTROLLER.nextQuestion();
    });

    // Adds a click listener for dynamically-added "#submit-button"
    $(document).on("click", "#submit-button", function(event) {
      event.preventDefault();
      MODEL.userAnswer.length = 0;
      // Record user answer to question
      var userPick = $(
        "#responses input:radio[name=optionsRadios]:checked"
      ).val();
      MODEL.userAnswer.push(userPick);
      CONTROLLER.handleQuestionSubmit();
    });

    // Adds a click listener for dynamically-added "#restart-button"
    $(document).on("click", "#restart-button", function(event) {
      event.preventDefault();
      CONTROLLER.reset();
      VIEW.clearQuestion();
      VIEW.displayStart();
    });
  },
  nextQuestion: function() {
    VIEW.emptyContent();
    VIEW.displayQuestion();
    CONTROLLER.resetTimer();
    CONTROLLER.runTimer();
  },
  handleQuestionSubmit: function() {
    CONTROLLER.checkQuestion();
    MODEL.questionCounter++;

    if (MODEL.questionCounter === MODEL.questions.length) {
      setTimeout(CONTROLLER.endGame, MODEL.answerTimeout);
    } else {
      setTimeout(CONTROLLER.nextQuestion, MODEL.answerTimeout);
    }
  },
  checkQuestion: function() {
    var questions = MODEL.questions;
    var questionCounter = MODEL.questionCounter;
    var userAnswer = MODEL.userAnswer;
    var correctAnswer = questions[questionCounter].choicesAnswer;

    CONTROLLER.stopTimer();
    VIEW.clearQuestion();
    VIEW.displayResult();
    if (userAnswer[0] == questions[questionCounter].choicesAnswer) {
      VIEW.displayCorrect();
      MODEL.correct++;
    } else if (userAnswer[0] === undefined) {
      VIEW.displayOutOfTime(questions[questionCounter].choices[correctAnswer]);
      MODEL.missed++;
    } else {
      VIEW.displayIncorrect(questions[questionCounter].choices[correctAnswer]);
      MODEL.incorrect++;
    }
  },
  endGame: function() {
    VIEW.displayEndPage();
  },
  resetTimer: function() {
    MODEL.timeLeft = 10;
    VIEW.displayTimer();
  },
  runTimer: function() {
    MODEL.increment = setInterval(CONTROLLER.decrement, 1000);
  },
  stopTimer: function() {
    clearInterval(MODEL.increment);
  },
  decrement: function() {
    MODEL.timeLeft--;
    VIEW.displayTimer();
    if (MODEL.timeLeft === 0) {
      CONTROLLER.stopTimer();
      MODEL.userAnswer.length = 0;
      var userPick = $(
        "#responses input:radio[name=optionsRadios]:checked"
      ).val();
      MODEL.userAnswer.push(userPick);
      CONTROLLER.handleQuestionSubmit();
    }
  },
  reset: function() {
    MODEL.questionCounter = 0;
    MODEL.correct = 0;
    MODEL.incorrect = 0;
    MODEL.missed = 0;
    MODEL.userAnswer = [];
    MODEL.timeLeft = 10;
    MODEL.increment = null;
  }
};

$(document).ready(function() {
  CONTROLLER.init();
});
