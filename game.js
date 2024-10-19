const buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

function playSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

$(document).ready(() => {
  $('#start').on('click', function () {
    animatePress('start');
    $('.start-row').slideToggle();
    while (gameStarted == false) {
      gameStarted = true;
      setTimeout(function () {
        nextSequence();
      }, 600);
    }
  });
});

$('.btn').click(function () {
  var userChosenColor = $(this).attr('id');
  var answer = userClickedPattern.push(userChosenColor) - 1;

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(answer);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);

  $('#level-title').html(`Level ${level}`);

  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  for (var i = 0; i < gamePattern.length; i++) {
    let k = i;
    setTimeout(function () {
      $(`#${gamePattern[k]}`).fadeOut(100).fadeIn(100);
      playSound(gamePattern[k]);
    }, 500 * k);
  }
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass('pressed');

  setTimeout(function () {
    $(`#${currentColor}`).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);

      userClickedPattern = [];
    }
  } else if (gamePattern.length < 1) {
  } else {
    var wrong = new Audio(`sounds/wrong.mp3`);

    wrong.play();
    $('body').addClass('game-over');

    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').html('Game Over!!');

    startOver();
  }
}

function startOver() {
  $('.start-row').slideToggle();
  $('#start').addClass('restart');
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  gameStarted = false;
}
