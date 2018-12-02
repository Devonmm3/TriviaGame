$(document).ready(function() {
  var correct = 0;
  var incorrect = 0;
  var missed = 0;
  var questionCounter = 0;
  var userAnswer = [];
  var answerTimeout = 2000;
  //Creating an array of objects with the questions, answer options, and correct answer
  var questions = [
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
  ];
  //   //Function to submit answers
  function submitAnswer() {
    $("#submit").on("click", function(e) {
      e.preventDefault();
      userAnswer.length = 0;

      //       //Record user answer to question
      var userPick = $(
        "#responses input:radio[name=optionsRadios]:checked"
      ).val();
      userAnswer.push(userPick);
      console.log(userAnswer);
      nextQuestion();
    });
  }

  //   //Creating question timer variables & functions
  var timeLeft = 10;
  var increment;

  function runTimer() {
    increment = setInterval(decrement, 1000);
  }

  function decrement() {
    timeLeft--;
    $("#time-left").html("Time remaining: " + timeLeft + " seconds");
    if (timeLeft === 0) {
      stopTimer();
      userAnswer.length = 0;
      //Record user answer to question
      var userPick = $(
        "#responses input:radio[name=optionsRadios]:checked"
      ).val();
      userAnswer.push(userPick);
      console.log(userAnswer);
      nextQuestion();
    }
  }

  function resetTimer() {
    timeLeft = 10;
    $("#time-left").html("Time remaining: " + timeLeft + " seconds");
  }

  function displayTimer() {
    $("#time-left").html("Results");
  }

  function stopTimer() {
    clearInterval(increment);
  }

  //   //Function to display the given response options
  function createRadios() {
    var responseOptions = $("#responses");
    //     //Empty array for user answer
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
  }

  //   //Function to display the given question
  function displayQuestion() {
    clearQuestion();
    resetTimer();
    $(".questionY").html(questions[questionCounter].question);
    //Calling the function to display the response options
    createRadios();
    //     //Creating submit button
    $("#submit").append(
      '<button type="submit" class="btn btn-default" id="submit">' +
        "Submit" +
        "</button>"
    );
    runTimer();
    submitAnswer();
  }

  //   //Display start page
  function displayStart() {
    $("#content").append(
      '<a href="#" class="btn btn-primary btn-lg" id="start-button">' +
        "Start" +
        "</a>"
    );
    //     //Start game
    $("#start-button").on("click", function(event) {
      event.preventDefault();
      //Displays the first question
      firstQuestion();
      resetTimer();
    });
  }

  //   //Reset for end of game
  function reset() {
    questionCounter = 0;
    correct = 0;
    incorrect = 0;
    missed = 0;
    userAnswer = [];
    resetTimer();
  }

  //   //Display end page
  function displayEndPage() {
    clearQuestion();
    $("#content").append(
      "<h3>" +
        "Correct answers: " +
        correct +
        "</h3><br><h3>" +
        "Incorrect answers: " +
        incorrect +
        "</h3><br><h3>" +
        "Skipped questions: " +
        missed +
        '</h3><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' +
        "Restart Game" +
        "</a>"
    );
    //     //Restart game
    $("#restart-button").on("click", function(event) {
      event.preventDefault();
      //       //Displays the first question
      reset();
      clearQuestion();
      displayStart();
    });
  }

  //   //Function to clear the question
  function clearQuestion() {
    var qDiv = $(".questionY");
    qDiv.empty();

    var aDiv = $("#responses");
    aDiv.empty();

    var submitDiv = $("#submit");
    submitDiv.empty();

    var contentDiv = $("#content");
    contentDiv.empty();

    stopTimer();
  }

  //   //Showing whether answer was right/wrong
  function checkQuestion() {
    clearQuestion();
    var correctAnswer = questions[questionCounter].choicesAnswer;
    if (userAnswer[0] == questions[questionCounter].choicesAnswer) {
      $("#content").append(
        "<h3>" + "You were right!! Ten points to Gryffindor!" + "</h3>"
      );
      correct++;
      displayTimer();
    } else if (userAnswer[0] === undefined) {
      $("#content").append(
        "<h3>" +
          "You need a time turner!" +
          "</h3><br><br><h3>" +
          "The right answer is : " +
          questions[questionCounter].choices[correctAnswer] +
          "</h3>"
      );
      missed++;
      displayTimer();
    } else {
      $("#content").append(
        "<h3>" +
          "Wrong! Detention in the Forbidden Forest for you! " +
          "</h3><br><br><h3>" +
          "The right answer was: " +
          questions[questionCounter].choices[correctAnswer] +
          "</h3>"
      );
      incorrect++;
      displayTimer();
    }
  }

  //   //Function to change the question
  function nextQuestion() {
    checkQuestion();
    //     //Incrementing the count by 1
    questionCounter++;
    //     //If the count is the same as the length of the question array, the counts reset to 0
    if (questionCounter === questions.length) {
      setTimeout(displayEndPage, answerTimeout);
    } else {
      setTimeout(displayQuestion, answerTimeout);
    }
  }
  function firstQuestion() {
    var startContent = $("#content");
    startContent.empty();
    displayQuestion();
  }

  displayStart();
});

//   //Function to call the first question
//   function firstQuestion() {
//    var startContent = $("#content");
//     startContent.empty();
//     displayQuestion();
//   }

//   //Displays the start page
//   displayStart();
// });

// // variable to count/track each question
// // var questionCounter = 0;
// //variable to have slight pause between questions
// // var answerTimeout = 2000;
// //variables for the score (right, wrong, and number of questions answered)
// // var timer;
// // // var timeRemaing = 10;
// // var game ={
// //  correctAnswer: 0,
// //  incorrectAnswer: 0,
// //  counter: 0,
// // }
// //variable that works as an array for the user's answers
// // var answerSelected = [];

// //variable that works as an array of the objects ::question, answer options and the correct answer

// // // $(document).ready(function() {
// // //this function is for the user to submit his/her answer
// // // function answerQuestion() {
// // //   $("#submit").on("click", function(event) {
// // //     event.preventDefault();
// // //     answerSelected.length = 0;

// // //     //user answers need to be recorded and saved from question to question
// // //     var playerChoice = $("#responses");
// // //     if (answerSelected.length > 0) {
// // //       answerSelected = answerSelected.val();
// // //     }
// // //     answerSelected.push(playerChoice);
// // //     console.log(answerSelected);
// // //     nextQuestion();
// // //   });
// // // }
// // //need variables for the timer

// // //function to start the timer
// // // function startTimer() {
// // //   timer = setInterval((decrement = 1000));
// // // }

// // // //function to do the countdown
// // // function decrement() {
// // //   timeRemaing--;
// // //   $("#timeLeft").html("Countdown: " + timeRemaing + "seconds");
// // //   if (timeRemaing === 0) {
// // //     stopTimer();
// // //     answerSelected.length = 0;

// // countdown: function() {
// //   game.counter--;
// //   $("#timeLeft").html(game.counter);
// //   if (game.counter === 0) {
// //     console.log("Time is up");
// //     game.done();
// //   }
// // }

// //   //need to save the user's answer
// //   var playerChoice = $("#responses input[type='radio']:checked");
// //   if (selected.length > 0) {
// //     answerSelected = selected.val();
// //   }
// //   answerSelected.push(playerChoice);
// //   console.log(answerSelected);
// //   nextQuestion();
// // }

// // // function to display the timer
// // function showTimer() {
// //   $("#timeLeft").html("Results");
// // }
// // //funtion to stop the timer at the end of the 10 seconds
// // function stopTimer() {
// //   clearInterval(increment);
// // }
// // //function to reset the timer for the next questions
// // function timerReset() {
// //   timeRemaing = 10;
// //   $("#timeLeft").html("Countdown: " + timeRemaing + " seconds");
// // }

// // //function needs to show the response options for each question with a radio button for each question
// // function createRadios() {
// //   var answersOptions = $("#responses");
// //   //needs to have an array (empty) for the user's answer
// //   // answersOptions.empty();

// //   for (var i = 0; i < questionsAndAnswers[questionCounter].choices; i++) {
// //     answersOptions.append(
// //       '<label><input type="radio" name= "optionsRadios" id="optionsRadios2" value="' +
// //         [i] +
// //         '"><div class="hp opt">' +
// //         questionsAndAnswer[questionCounter].choices[i] +
// //         "</div></input</></label>"
// //     );
// //   }
// // }

// // //function to show the start page
// // function showStartPage() {
// //   $("#start-div").append(
// //     "<a href='#' class='btn btn-primary btn-sm' id='start'>" +
// //       "Start!" +
// //       "</a>"
// //   );

// //start the game

// //     $("#start").on("click", function(event) {
// //       event.preventDefault();
// //       game.counter
// //       firstQuestion();
// //       timerReset();
// //       console.log("answer selected is this: " + answerSelected);
// //     });
// //   }

// //   //function to display the current question
// //   function showQuestion() {
// //     clearQuestion();
// //     timerReset();
// //     console.log("line 167: " + questionsAndAnswers[questionCounter].question);
// //     $(".questionY").html(questionsAndAnswers[questionCounter].question);
// //     $("#responses").text(questionsAndAnswers[questionCounter].answerChoices);
// //     console.log(
// //       "answer choices are: " +
// //         questionsAndAnswers[questionCounter].answerChoices
// //     );
// //     createRadios();
// //     $("#submit").append(
// //       '<button type="submit" class="btn btn-default" id="submit">' +
// //         "Submit" +
// //         "</button>"
// //     );
// //     startTimer();
// //     answerQuestion();
// //   }

// //   //function for the end of the game to reset it
// //   function resetGame() {
// //     correctAnswer = 0;
// //     incorrectAnswer = 0;
// //     questionCounter = 0;
// //     unanswered = 0;
// //     answerSelected = [];
// //     timerReset();
// //   }

//   //funtion to show the results page
// //   function showResultsPage() {
// //     clearQuestion();
// //     $("#content").append(
// //       "<h5>" +
// //         "Correct:" +
// //         correctAnswer +
// //         "</h5><br><h5>" +
// //         "Incorrect:" +
// //         incorrectAnswer +
// //         "</h5><br><h5>" +
// //         "Questions Answered:" +
// //         unanswered +
// //         '</h5><br><br><a href="#" class=btn btn-primary btn-sm" id="restart button">' +
// //         "Restart" +
// //         "</a>"
// //     );
// //     $("#restart").on("click", function(event) {
// //       event.preventDefault();
// //       resetGame();
// //       clearQuestion();
// //       showStartPage();
// //     });
// //   }

// //   //need a function to clear the questions
// //   function clearQuestion() {
// //     var aDiv = $("#responses");
// //     aDiv.empty();

// //     var qDiv = $(".questionY");
// //     qDiv.empty();

// //     var sDiv = $("#submit");
// //     sDiv.empty();

// //     // var cDiv = $("#content");
// //     // cDiv.empty();

// //     stopTimer();
// //   }

// //   //need a function to show if the answer was correct or not
// //   function checkQuestions() {
// //     clearQuestion();

// //     //if the uswer answers the question correctly:
// //     var answerCorrect = questionsAndAnswers[questionCounter].rightAnswer;
// //     console.log("var answer correct is: " + answerCorrect);
// //     if (
// //       answerSelected[0] == questionsAndAnswers[questionCounter].correctAnswer
// //     ) {
// //       $("#content").append(
// //         "<h4>" + "Correct! Ten Points to Gryffindor!" + "</h4>"
// //       );
// //       correctAnswer++;
// //       showTimer();
// //       //the time runs out before the question is answered
// //     } else if (answerSelected[0] === undefined) {
// //       $("#content").append(
// //         "<h4>" +
// //           "Out of Time. The right answer is: " +
// //           questionAndAnswer[questionCounter].choices[answerCorrect] +
// //           "</h4>"
// //       );
// //       questionsUnanswered++;
// //       showTimer();
// //       //the question is answered incorrectly
// //     } else {
// //       $("#content").append(
// //         "<h4>" +
// //           "Bollocks!  Incorrect, ten points to Slytherin. The right answer is: " +
// //           questionsAndAnswers[questionCounter].choices[correctAnswer] +
// //           "</h4>"
// //       );
// //       incorrectAnswer++;
// //       showTimer();
// //     }
// //   }

// //   //funtion to move on to the next question
// //   function nextQuestion() {
// //     checkQuestions();
// //     questionCounter++;
// //     if (questionCounter === questionsAndAnswers.length) {
// //       setTimeout(showResultsPage, answerTimeout);
// //     } else {
// //       setTimeout(showQuestion, answerTimeout);
// //     }
// //   }

// //   //need function to show the first question
// //   function firstQuestion() {
// //     // var beginContent = $("#content");
// //     // beginContent.empty();
// //     showQuestion();
// //   }

// //   //start page
// //   showStartPage();
// // });

// // //need help with the radio buttons, with making sure that length is correctly defined.
// // //Syntax should be good and the functions seem to be good except for decrement which isn't being
// // //recognied as long as there is a digit after the ==
