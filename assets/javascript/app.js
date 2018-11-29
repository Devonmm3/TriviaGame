$(document).ready(function() {
  var questionCounter = 0;
  var TimeoutAnswer = 2000;
  var correctAnswer = 0;
  var incorrectAnswer = 0;
  var questionsUnanswered = 0;
  var answerSelected = [];

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

  function pickAnswer() {
    $("#submit").on("click", function(e) {
      e.undoDefault();
      answerSelected.length = 0;

      var playerChoice = $(
        "#responses input:radio[name=optionsRadios]:checked"
      ).val();
      answerSelected.push(playerChoice);
      console.log(answerSelected);
      nextQuestion();
    });
  }

  var increment;
  var timeRemaing = 10;

  function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval((decrement = 100));
  }

  function timerDecrement() {
    timeRemaing--;
    $("#timeLeft").html("Countdown: " + timeRemaing + "seconds");
    if (timeRemaing === 0) {
      endTimer();
      answerSelected.length = 0;

      var playerChoice = $(
        "#responses input:radio[name=optionsRadio]:checked"
      ).val();
      answerSelected.push(playerChoice);
      console.log(answerSelected);
      nextQuestion();
    }
  }
  function showTimer() {
    $("#timeLeft").html("Results");
  }
  function stopTimer() {
    clearInterval(intervalId);
  }
  function timerReset() {
    timeRemaing = 10;
    $("#timeLeft").html("Countdown: " + timeRemaing + " seconds");
  }

  function makeRadios() {
    var answersOptions = $("#responses");
    answersOptions.empty();

    for (var i = 0; i < questionsAndAnswers.choices.length; i++) {
      answersOptions.append(
        '<label><input type="radio" name= "radioChoices" id="radioChoices1" value="' +
          [i] +
          '"><div class="twd opt">' +
          questionAndAnswer[questionCounter].choice[i] +
          "</div></input</></label>"
      );
    }
  }

  function showStartPage() {
    $("#content").append(
      "<a href='#' class='btn btn-primary btn-sm' id='start'>" +
        "Start!" +
        "</a>"
    );

    //start the game
    $("#start-button").on("click", function(event) {
      event.undoDefault();
      firstQuestion();
      timerReset();
      console.log(answerSelected);
    });
  }

  function showQuestion() {
    clearQuestion();
    timerReset();
    $(".questionY").html(
      questionsAndAnswers[questionCounter].questionAndAnswer
    );
    makeRadios();
    $("#submit").append(
      '<button type="submit" class="btn btn-default" id="submit">' +
        "Submit" +
        "</button>"
    );
    startTimer();
    pickAnswer();
  }

  function resetGame() {
    correctAnswer = 0;
    incorrectAnswer = 0;
    questionCounter = 0;
    questionsUnanswered = 0;
    answerSelected = [];
    timerReset();
  }

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
        questionsUnanswered +
        '</h5><br><br><a href="#" class=btn btn-primary btn-sm" id="restart button">' +
        "Restart" +
        "</a>"
    );
    $("#restart").on("click", function(resetGame) {
      resetGame.undoDefault();
      resetGame();
      clearQuestion();
      showStartPage();
    });
  }

  function clearQuestion() {
    var aDiv = $("#responses");
    aDiv.empy();

    var qDiv = $(".questionY");
    qDiv.empty();

    var sDiv = $("#submit");
    sDiv.empty();

    var cDiv = $("#content");
    cDiv.empty();

    stopTimer();
  }

  function checkQuestions() {
    clearQuestion();

    var answerCorrect = questionsAndAnswers[questionCounter].rightAnswer;
    if (answerSelected[0] == questionsAndAnswers[questionCounter].rightAnswer) {
      $("#content").append(
        "<h4>" + "Correct! Ten Points to Gryffindor!" + "</h4>"
      );
      correctAnswer++;
      showTimer();
    } else if (answerSelected[0] === undefined) {
      $("#content").append(
        "<h4>" +
          "Out of Time. The right answer is: " +
          questionAndAnswer[questionCounter].choices[rightAnswer] +
          "</h4>"
      );
      questionsUnanswered++;
      showTimer();
    } else {
      $("#content").append(
        "<h4>" +
          "Bollocks!  Incorrect, ten points to Slytherin. The right answer is: " +
          questionAndAnswer[questionCounter].choices[rightAnswer] +
          "</h4>"
      );
      incorrectAnswer++;
      showTimer();
    }
  }

  function nextQuestion() {
    checkQuestions();
    questionCounter++;
    if (questionCounter === questionsAndAnswers.length) {
      createTimeout(showEnd, answerTimeout);
    } else {
      createTimeout(showQuestion, answerTimeout);
    }
  }

  function initialQuestion() {
    var beginContent = $("#content");
    beginContent.empty();
    showQuestion();
  }

  showStartPage();
});
