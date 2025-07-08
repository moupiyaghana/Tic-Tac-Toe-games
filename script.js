console.log("Welcome to Tic Tac Toe");

let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");

let turn = "X";
let isgameover = false;

let player1Name = "";
let player2Name = "";

// Function to change turn
const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

// Function to check for win
const checkWin = () => {
  let boxtext = document.getElementsByClassName('boxtext');
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];

  wins.forEach(e => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      let winner = boxtext[e[0]].innerText === "X" ? player1Name : player2Name;
      document.querySelector('.info').innerText = winner + " Won!";
      isgameover = true;
      gameover.play();
      document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
      document.querySelector('.line').style.transform =
        `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector('.line').style.width = "20vw";
    }
  });
};

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
  let boxtext = element.querySelector('.boxtext');
  element.addEventListener('click', () => {
    if (boxtext.innerText === '' && !isgameover) {
      boxtext.innerText = turn;
      audioTurn.play();
      checkWin();
      if (!isgameover) {
        turn = changeTurn();
        let playerTurn = turn === "X" ? player1Name : player2Name;
        document.querySelector(".info").innerText = "Turn for " + playerTurn;
      }
    }
  });
});

// Reset button
let reset = document.getElementById('reset');
reset.addEventListener('click', () => {
  let boxtexts = document.querySelectorAll('.boxtext');
  Array.from(boxtexts).forEach(element => {
    element.innerText = "";
  });
  turn = "X";
  isgameover = false;
  document.querySelector(".info").innerText = "Turn for " + player1Name;
  document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0";
  document.querySelector('.line').style.width = "0";
});

// Start game button
document.getElementById('startBtn').addEventListener('click', () => {
  let p1 = document.getElementById('player1').value.trim();
  let p2 = document.getElementById('player2').value.trim();

  if (p1 === "" || p2 === "") {
    alert("Please enter both player names!");
    return;
  }

  player1Name = p1;
  player2Name = p2;

  document.querySelector('.player-input').style.display = "none";
  document.querySelector('.gamecontainer').style.display = "flex";
  document.querySelector(".info").innerText = "Turn for " + player1Name;
});
