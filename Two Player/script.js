var origBoard;
var currentPlayer = 'O';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
];

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id);
	}
}

function turn(squareId) {
	origBoard[squareId] = currentPlayer;
	document.getElementById(squareId).innerText = currentPlayer;
	let gameWon = checkWin(origBoard, currentPlayer);
	if (gameWon) {
		gameOver(gameWon);
	} else {
		if (checkTie()) {
			gameOver(null);
		} else {
			currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
		}
	}
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	if (gameWon) {
		for (let index of winCombos[gameWon.index]) {
			document.getElementById(index).style.backgroundColor =
				gameWon.player === 'O' ? "green" : "red";
		}
		declareWinner(gameWon.player === 'O' ? "Player 1 wins!" : "Player 2 wins.");
	} else {
		for (var i = 0; i < cells.length; i++) {
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("It's a draw!");
	}
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	return origBoard.filter(s => typeof s === 'number');
}

function checkTie() {
	if (emptySquares().length === 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "burlywood";
			cells[i].removeEventListener('click', turnClick, false);
		}
		return true;
	}
	return false;
}
