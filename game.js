
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  
});

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  level++;
  $("#level-title").text("level " + level);

  
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor) {


  $("#" + currentColor).addClass("pressed");

 
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function (e) { 
  if (!gameStarted) {
    $("#level-title").text("level " + level);
    nextSequence();
    gameStarted = true;
  }
  
  
});
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length)
      setTimeout(() => {
        nextSequence();
      }, 1000);
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
   
}
function startOver() {
  gamePattern = [];
  level = 0;
 
  gameStarted = false;
  
}
 
  

