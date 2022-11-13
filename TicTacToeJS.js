
var Board; //an array that keep track of all cells of the tic tac toe board and
          //tell us what is on each cells
const humanPlayer = 'O';
const aiPlayer = 'X';
const winingCombinations = [ [0, 1, 2], [3, 4, 5], [6, 7, 8],
                             [0, 3, 6], [1, 4, 7], [2, 5, 8],
                             [0, 4, 8], [2, 4, 6] ];

const cells = document.querySelectorAll('.cell'); //this variable has a reference to each cell in the Board

startGame();
function startGame() {
  document.querySelector(".endgame").style.display = "none";
  Board = Array.from(Array(9).keys());
  for (var i = 0; i < cells.length; i++){
    cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
  }
}

function turnClick(square) {
  if (typeof Board[square.target.id] == 'number') {
		turn(square.target.id, humanPlayer)
		if (!checkTie()) turn(bestSpot(), aiPlayer);
	}
}

function turn(squareID, player) {
  Board[squareID] = player;
  document.getElementById(squareID).innerText = player;
  let isWin = checkWin(Board, player);
  if(isWin) gameOver(isWin);
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winingCombinations.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winingCombinations[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == humanPlayer ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
  displayWinner(gameWon.player == humanPlayer ? "You win!" : "You lose.");
}

function emptySquares() {
	return Board.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(Board, aiPlayer).index;
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		displayWinner("Tie Game!")
		return true;
	}
	return false;
}

function displayWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function minimax(board, player) {
  var availableSpots = emptySquares(Board);

  if (checkWin(board, humanPlayer)) {
    return {score: -10};
  } else if (checkWin(board, aiPlayer)) {
    return {score: 10};
  } else if (availableSpots.length === 0) {
    return {score: 0};
  }

  var moves = [];
  for (let i = 0; i < availableSpots.length; i++) {
    var move = {};
    move.index = board[availableSpots[i]];
    board[availableSpots[i]] = player;

    if (player === aiPlayer)
      move.score = minimax(board, humanPlayer).score;
    else
       move.score =  minimax(board, aiPlayer).score;
    board[availableSpots[i]] = move.index;
    if ((player === aiPlayer && move.score === 10) || (player === humanPlayer && move.score === -10))
      return move;
    else
      moves.push(move);
  }

  let bestMove, bestScore;
  if (player === aiPlayer) {
    bestScore = -1000;
    for(let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
      bestScore = 1000;
      for(let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}
// Some random colors
const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

const numBalls = 50;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;

  balls.push(ball);
  document.body.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12
  };

  let anim = el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 2000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});
