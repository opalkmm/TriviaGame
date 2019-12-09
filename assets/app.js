//store references in variables
$(document).ready(function() {
  
  var card = $("#quiz-area");
  //questions, answers objects
  let questionsArray = [
    {
      question:
        "The Boston terrier was based on crossing English and French bulldogs with this terrier?",
      answerChoices: [
        "White English Terrier",
        "American Pit Bull Terrier",
        "Bull Terrier"
      ],
      correctAnswer: "White English Terrier"
    },
    {
      question:
        "What was the name of this heroic WWI hero of the 26th Infantry Division?",
      answerChoices: ["Yankee Boy", "Major Damage", "Sargeant Stubby"],
      correctAnswer: "Sargeant Stubby"
    },
    {
      question: "Which two American Presidents were owned by Boston terriers?",
      answerChoices: [
        "Warren G Harding and Gerald Ford",
        "Woodrow Wilson and Ronald Reagan",
        "James Garfield and Theodore Roosevelt"
      ],
      correctAnswer: "Warren G Harding and Gerald Ford"
    },
    {
      question: "What is the Boston terrier's nickname?",
      answerChoices: ["Tuxedo Jones", "The American Gentleman", "The Massachusetts Mini Mangler"],
      correctAnswer: "The American Gentleman"
    },
    {
      question:
        "Which three terms best describe the Boston terrier personality?",
      answerChoices: [
        "Stern, aloof, and distant",
        "Friendly, bright, and amusing",
        "Calm, regal, and dignified"
      ],
      correctAnswer: "Friendly, bright, and amusing"
    }
  ];

  console.log(questionsArray);

  // Variable that will hold the setInterval
  var timer;

  var game = {
    correct: 0,
    incorrect: 0,
    counter: 120,

    countdown: function() {
      game.counter--;
      $("#counter-number").html(game.counter);
      if (game.counter === 0) {
        console.log("TIME UP");
        game.done();
      }
    },

    start: function() {
      timer = setInterval(game.countdown, 1000);

      $("#sub-wrapper").prepend(
        "<h4>Time Remaining: <span id='counter-number'>120</span> Seconds</h4>" + "<hr>"
      );

      $("#start").remove();

      for (var i = 0; i < questionsArray.length; i++) {
        card.append("<h5>" + questionsArray[i].question + "</h5>");
        for (var j = 0; j < questionsArray[i].answerChoices.length; j++) {
            card.append(
            "<input type='radio' style='margin: 10px' name='question- " +
              i +
              "' value='" + 
              questionsArray[i].answerChoices[j] + 
              "''>" +
              questionsArray[i].answerChoices[j] + "<br>"
          );
        }
      }
      

      card.append("<br>" + "<button id='done' class='btn-primary'>Submit</button>");

    },

    done: function() {
      var inputs = card.children("input:checked");
      for (var i = 0; i < inputs.length; i++) {
        if ($(inputs[i]).val() === questionsArray[i].correctAnswer) {
          game.correct++;
        } else {
          game.incorrect++;
        }
      }
      this.result();
    },

    result: function() {
      clearInterval(timer);

      $("#question-container").remove();

      card.html("<h2>You've Made It!</h2>");
      card.append(
        "<h3>Correct Answers: " + this.correct + "</h3>"
      );
      card.append(
        "<h3>Incorrect Answers: " + this.incorrect + "</h3>"
      );
    }
  };

  // CLICK EVENTS

$(document).on("click", "#start", function() {
    game.start();
  });
  
  $(document).on("click", "#done", function() {
    game.done();
  });
});
  