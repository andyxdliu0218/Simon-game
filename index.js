const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let level = 0;
let userInput = [];
let userInputTimes = 0;

$("body").keypress((e) => {
  if (level === 0) {
    setTimeout(nextSequence, 1000);
  } else if(level >= 1){
    wrongButton();
  }
});

$(".btn").click(function () {
  let key = $(this).attr("id");
  makeSound(key);
  animation(key);
  userInput.push(key);

  if (checkUserInput() === false) {
    wrongButton();
  }

  if (userInput.length === gamePattern.length) {
    setTimeout(nextSequence, 1000);
    userInputTimes = 0;
  }
});

function nextSequence() {
  userInput = [];
  let color = randomColor();
  gamePattern.push(color);
  displayPattern(gamePattern);
  level++;
  $("#level-title").html(`Level ${level}`);
}

function checkUserInput() {
  if (gamePattern.length === 0) {
    return true;
  }
  if (userInput[userInputTimes] !== gamePattern[userInputTimes]) {
    return false;
  }
  userInputTimes++;
  return true;
}

function displayPattern(pattern) {
  pattern.forEach((color, index) => {
    let id = "#" + color;
    setTimeout(function () {
      $(id).fadeOut(100).fadeIn(100);
      makeSound(color);
    }, 500 * index);
  });
}

function wrongButton() {
  let wrongSoundAudio = new Audio("wrong.mp3");
  wrongSoundAudio.play();
  $("body").addClass("game-over");
  setTimeout(() => $("body").removeClass("game-over"), 200);
  level = 0;
  gamePattern = []; // cannot set userinput =[], it cause userinput.length === gamepattern
  userInputTimes = 0;
  $("#level-title").html(`Press Any Key to Start`);
}

function randomColor() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  return randomChosenColor;
}

function makeSound(id) {
  let audio = new Audio(`${id}.mp3`);
  audio.play();
}

function animation(id) {
  let idx = "#" + id;
  $(idx).addClass("pressed");
  setTimeout(function () {
    $(idx).removeClass("pressed");
  }, 100);
}

// function randomColor() {
//   let randomNumber = Math.floor(Math.random() * 4);
//   let randomChosenColor = buttonColors[randomNumber];
//   return randomChosenColor;
// }

// $(".btn").click(function () {
//   let id = $(this).attr("id");
//   makeSound(id);
//   animation(id);
//   userInput.push(id);

//   // Check if user input matches the pattern
//   if (!checkUserInput()) {
//     wrongButton();
//   }

//   // Check if user has completed the current level
//   if (userInput.length === gamePattern.length) {
//     setTimeout(nextSequence, 1000); // callback to next level !!
//   }
// });

// function nextSequence() {
//   userInput = [];
//   let color = randomColor();
//   gamePattern.push(color);
//   // Update the level
//   level += 1;
//   $("#level-title").html(`Level ${level}`);

//   // Display the pattern to the user
//   displayPattern(gamePattern);

//   if (level === 10) {
//     level = 0;
//     gamePattern = [];
//     $("#level-title").html("Press Any Key to Start");
//   }
// }

// function displayPattern(pattern) {
//   pattern.forEach((color, index) => {
//     setTimeout(() => {
//       $("#" + color).fadeOut(100).fadeIn(100);
//       makeSound(color);},
//       500 * index);
//   });
// }

// $("body").keypress(() => {
//   if (level === 0) {
//     setTimeout(nextSequence,1000);
//   }
// });

// function checkUserInput() {
//   if (gamePattern.length === 0) return true;
//   for (let i = 0; i < userInput.length; i++) {
//     if (userInput[i] !== gamePattern[i]) {
//       return false;
//     }
//   }
//   return true;
// }

// function wrongButton() {
//   $("body").addClass("game-over");
//   let wrong = new Audio("./sounds/wrong.mp3");
//   wrong.play();
//   setTimeout(function () {
//     $("body").removeClass("game-over");
//   }, 200);
//   $("#level-title").html("Press Any Key to Start");
//   level = 0;
//   gamePattern = [];
// }

// function makeSound(id) {
//   let audio = new Audio(`./sounds/${id}.mp3`);
//   audio.play();
// }

// function animation(id) {
//   let idx = "#" + id;
//   $(idx).addClass("pressed");
//   setTimeout(function () {
//     $(idx).removeClass("pressed");
//   }, 100);
// }
