///Challenge 1:Your age in day
function ageInDays() {
  var birthofYear = prompt("When you were born...good friend?");
  var ageInDays = (2020 - birthofYear) * 365;
  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode(
    "You are " + ageInDays + " days old"
  );
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}
function reset() {
  document.getElementById("ageInDays").remove();
}
///Challenge 2 cat gnerator
function generatecat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src = "static/image/dk.gif";
  div.appendChild(image);
}
///Challenge 3:Rock papper scissor
function rpsGame(yourChoice) {
  console.log(yourChoice);
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());
  console.log("computer choice", botChoice);
  results = decideWinner(humanChoice, botChoice);
  console.log(results);
  message = finalMessage(results);
  console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
}
function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}
function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}
function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };

  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];
  return [yourScore, computerScore];
}
function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: "you lost", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "you tied", color: "yellow" };
  } else {
    return { message: "you won!", color: "green" };
  }
}
function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imagesDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };
  //lets remove all the images
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();
  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");
  humanDiv.innerHTML =
    "<img src='" +
    imagesDatabase[humanImageChoice] +
    "' height=150  width=150 style='box-shadow:0px 10px 50px rgba(37,58,233,1);'>";
  document.getElementById("flex-box-rps-div").appendChild(humanDiv);

  messageDiv.innerHTML =
    "<h1 style='color:" +
    finalMessage["color"] +
    ";  font-size: 60px; padding:30px;'>" +
    finalMessage["message"] +
    "</h1>";
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);

  botDiv.innerHTML =
    "<img src='" +
    imagesDatabase[botImageChoice] +
    "' height=150  width=150 style='box-shadow:0px 10px 50px rgba(243,38,24,1);'>";
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

//challenge 4:Change all the color
var all_buttons = document.getElementsByTagName("button");
var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);
///main function
function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === "red") {
    buttonsRed();
  } else if (buttonThingy.value == "green") {
    buttonsGreen();
  } else if (buttonThingy.value == "reset") {
    buttonsColorReset();
  } else if (buttonThingy.value == "random") {
    randomColors();
  }
}
function buttonsRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}
function buttonsGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}
function buttonsColorReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}
function randomColors() {
  let choices = ["btn-primary", "btn-danager", "btn-success", "btn-warning"];
  for (let i = 0; i < all_buttons.length; i++) {
    let randomNuber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNuber]);
  }
}

////Chalenge 5 :Blackjack
let blackjackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    J: 10,
    Q: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnsOver: false,
};
const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];
const hitSound = new Audio("static/image/swish.m4a");
const winSound = new Audio("static/image/cash.mp3");
const lossSound = new Audio("static/image/aww.mp3");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);

document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);

document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    console.log(card);
    showcard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}
function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

function showcard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `static/image/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame["turnsOver"] === true) {
    blackjackGame["isStand"] = false;
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    for (i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }

    for (i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    YOU["score"] = 0;
    DEALER["score"] = 0;
    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;
    document.querySelector("#your-blackjack-result").style.color = "#ffffff";
    document.querySelector("#dealer-blackjack-result").style.color = "#ffffff";
    document.querySelector("#blackjack-result").textContent = "Lets Play!";
    document.querySelector("#blackjack-result").style.color = "black";
    blackjackGame["turnsOver"] = true;
  }
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    //if adding 11 keeps ,e below 21,otherwise add 1
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function dealerLogic() {
  blackjackGame["isStand"] = true;
  let card = randomCard();
  showcard(card, DEALER);
  updateScore(card, DEALER);
  showScore(DEALER);

  if (DEALER["score"] > 15) {
    blackjackGame["turnsOver"] = true;

    let winner = computeWinner();
    showResult(winner);
    console.log(blackjackGame["turnsOver"]);
  }
}

//winner and return who just won
//update wins ,loss and draws
function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      blackjackGame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      blackjackGame["losses"]++;

      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      blackjackGame["draws"]++;
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    console.log("YOU Lost!");
    blackjackGame["losses"]++;

    winner = DEALER;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blackjackGame["draws"]++;
  }
  console.log(blackjackGame);
  return winner;
}
function showResult(winner) {
  let message, messageColor;

  if (blackjackGame["turnsOver"] === true) {
    if (winner === YOU) {
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = "You Won!";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector("#losses").textContent = blackjackGame["losses"];

      message = "You Lost!";
      messageColor = "red";
      lossSound.play();
    } else {
      document.querySelector("#draws").textContent = blackjackGame["draws"];

      message = "You Drew";
      messageColor = "black";
    }
    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
}
