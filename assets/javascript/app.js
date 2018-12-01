$(document).ready(function() {
  // variable to count/track each question
  var questionCounter = 0;
  //variable to have slight pause between questions
  var answerTimeout = 2000;
  //variables for the score (right, wrong, and number of questions answered)
  var correctAnswer = 0;
  var incorrectAnswer = 0;
  var unanswered = 0;
  //variable that works as an array for the user's answers
  var answerSelected = [];

  //variable that works as an array of the objects ::question, answer options and the correct answer
  var questionsAndAnswers = [
    {
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
      answerChoices: [
        "Remus Lupin",
        "Albus Dumbledore",
        "Vernan Dursely",
        "Sirius Black"
      ],
      rightAnswer: 3
    },
    {
      question: "Who is the current head of Gryffindor House?",
      answerChoices: [
        "Godric Gryffindor",
        "Miverna McGonagall",
        "Tom Riddle",
        "Dolores Umbridge"
      ],
      rightAnswer: 1
    },
    {
      question: "What position does Harry play in Quidditch?",
      answerChoices: ["Chaser", "Seeker", "Chaser", "Beater"],
      rightAnswer: 1
    },
    {
      question: "What street to the Durselys live on?",
      answerChoices: [
        "Ablus Avenue",
        "Market Street",
        "Privitt Dr",
        "Privitt Ave"
      ],
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
      rightAnswer: 1
    }
  ];

  //this function is for the user to submit his/her answer
  function answerQuestion() {
    $("#submit").on("click", function(event) {
      event.preventDefault();
      answerSelected.length = 0;

      //user answers need to be recorded and saved from question to question
      var playerChoice = $("#responses");
      if (answerSelected.length > 0) {
        answerSelected = answerSelected.val();
      }
      answerSelected.push(playerChoice);
      console.log(answerSelected);
      nextQuestion();
    });
  }
  //need variables for the timer
  var increment;
  var timeRemaing = 10;

  //function to start the timer
  function startTimer() {
    increment = setInterval((decrement = 1000));
  }

  //function to do the countdown
  function decrement() {
    timeRemaing--;
    $("#timeLeft").html("Countdown: " + timeRemaing + "seconds");
    if (timeRemaing === 0) {
      stopTimer();
      answerSelected.length = 0;
    }
    //need to save the user's answer
    var playerChoice = $("#responses input[type='radio']:checked");
    if (selected.length > 0) {
      answerSelected = selected.val();
    }
    answerSelected.push(playerChoice);
    console.log(answerSelected);
    nextQuestion();
  }

  // function to display the timer
  function showTimer() {
    $("#timeLeft").html("Results");
  }
  //funtion to stop the timer at the end of the 10 seconds
  function stopTimer() {
    clearInterval(increment);
  }
  //function to reset the timer for the next questions
  function timerReset() {
    timeRemaing = 10;
    $("#timeLeft").html("Countdown: " + timeRemaing + " seconds");
  }

  //function needs to show the response options for each question with a radio button for each question
  function createRadios() {
    var answersOptions = $("#responses");
    //needs to have an array (empty) for the user's answer
    // answersOptions.empty();

    for (var i = 0; i < questionsAndAnswers[questionCounter].choices; i++) {
      answersOptions.append(
        '<label><input type="radio" name= "optionsRadios" id="optionsRadios2" value="' +
          [i] +
          '"><div class="hp opt">' +
          questionsAndAnswer[questionCounter].choices[i] +
          "</div></input</></label>"
      );
    }
  }

  //function to show the start page
  function showStartPage() {
    $("#start-div").append(
      "<a href='#' class='btn btn-primary btn-sm' id='start'>" +
        "Start!" +
        "</a>"
    );

    //start the game
    $("#start").on("click", function(event) {
      event.preventDefault();

      firstQuestion();
      timerReset();
      console.log("answer selected is this: " + answerSelected);
    });
  }

  //function to display the current question
  function showQuestion() {
    clearQuestion();
    timerReset();
    console.log("line 167: " + questionsAndAnswers[questionCounter].question);
    $(".questionY").html(questionsAndAnswers[questionCounter].question);
    $("#responses").text(questionsAndAnswers[questionCounter].answerChoices);
    console.log(
      "answer choices are: " +
        questionsAndAnswers[questionCounter].answerChoices
    );
    createRadios();
    $("#submit").append(
      '<button type="submit" class="btn btn-default" id="submit">' +
        "Submit" +
        "</button>"
    );
    startTimer();
    answerQuestion();
  }

  //function for the end of the game to reset it
  function resetGame() {
    correctAnswer = 0;
    incorrectAnswer = 0;
    questionCounter = 0;
    unanswered = 0;
    answerSelected = [];
    timerReset();
  }

  //funtion to show the results page
  function showResultsPage() {
    clearQuestion();
    $("#content").append(
      "<h5>" +
        "Correct:" +
        correctAnswer +
        "</h5><br><h5>" +
        "Incorrect:" +
        incorrectAnswer +
        "</h5><br><h5>" +
        "Questions Answered:" +
        unanswered +
        '</h5><br><br><a href="#" class=btn btn-primary btn-sm" id="restart button">' +
        "Restart" +
        "</a>"
    );
    $("#restart").on("click", function(event) {
      event.preventDefault();
      resetGame();
      clearQuestion();
      showStartPage();
    });
  }

  //need a function to clear the questions
  function clearQuestion() {
    var aDiv = $("#responses");
    aDiv.empty();

    var qDiv = $(".questionY");
    qDiv.empty();

    var sDiv = $("#submit");
    sDiv.empty();

    // var cDiv = $("#content");
    // cDiv.empty();

    stopTimer();
  }

  //need a function to show if the answer was correct or not
  function checkQuestions() {
    clearQuestion();

    //if the uswer answers the question correctly:
    var answerCorrect = questionsAndAnswers[questionCounter].rightAnswer;
    console.log("var answer correct is: " + answerCorrect);
    if (
      answerSelected[0] == questionsAndAnswers[questionCounter].correctAnswer
    ) {
      $("#content").append(
        "<h4>" + "Correct! Ten Points to Gryffindor!" + "</h4>"
      );
      correctAnswer++;
      showTimer();
      //the time runs out before the question is answered
    } else if (answerSelected[0] === undefined) {
      $("#content").append(
        "<h4>" +
          "Out of Time. The right answer is: " +
          questionAndAnswer[questionCounter].choices[answerCorrect] +
          "</h4>"
      );
      questionsUnanswered++;
      showTimer();
      //the question is answered incorrectly
    } else {
      $("#content").append(
        "<h4>" +
          "Bollocks!  Incorrect, ten points to Slytherin. The right answer is: " +
          questionsAndAnswers[questionCounter].choices[correctAnswer] +
          "</h4>"
      );
      incorrectAnswer++;
      showTimer();
    }
  }

  //funtion to move on to the next question
  function nextQuestion() {
    checkQuestions();
    questionCounter++;
    if (questionCounter === questionsAndAnswers.length) {
      setTimeout(showResultsPage, answerTimeout);
    } else {
      setTimeout(showQuestion, answerTimeout);
    }
  }

  //need function to show the first question
  function firstQuestion() {
    // var beginContent = $("#content");
    // beginContent.empty();
    showQuestion();
  }

  //start page
  showStartPage();
});

//need help with the radio buttons, with making sure that length is correctly defined.
//Syntax should be good and the functions seem to be good except for decrement which isn't being
//recognied as long as there is a digit after the ==
