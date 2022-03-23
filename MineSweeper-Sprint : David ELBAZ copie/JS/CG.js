"use strict";

// Pieces Types
const MINE_BLACK = "💣";
const RED_FLAG = "🚩";
const NUMBER_ONE = "1️⃣";
const NUMBER_TWO = "2️⃣";
const NUMBER_THREE = "3️⃣";
const NUMBER_FOUR = "4️⃣";

// Global variables

var gIsFirstClickOn = true;
var gTotalOfSec = 0;
var gTimeVar = 0;

var gBoard; // The Model

var cell = {
  minesAroundCount: 4,
  isShown: true,
  isMine: false,
  isMarked: true,
};

var gLevel = {
  SIZE: 4,
  MINES: 2,
};

var gGame = {
  isOn: false,
  leftLives: 3,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};

initGame();


function initGame() {

    window.addEventListener("contextmenu", e => e.preventDefault()); 
    
    gBoard = buildBoard()
    setRandomMine(gBoard, gLevel.MINES)
    setMinesNegCount(gBoard)
    renderBoard(gBoard)
    console.log('gBoard', gBoard)

}



// cellClicked(elCell, i , j)
// cellMarked(elCell)
// checkGameOver()
// expandShown(board, elCell, i , j)


function buildBoard(board) {
  //build the board 4 * 4
 
  var board = [];
  for (var i = 0; i < gLevel.SIZE; i++) {
     board[i] = [];
     for (var j = 0; j < gLevel.SIZE; j++) {
        var cell = {
            minesAroundCount: null,
            isShown: false,
            isMine: false,
            isMarked: false
        }
        board[i][j] = cell;
    }
  } return board

}

function setMinesNegCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            if (cell.isMine) continue
            var mineCount = countMinesNeg(i, j, board)
            if (mineCount > 0) {
                cell.minesAroundCount = mineCount
            }
        }
    }
}

function countNegOfMines(mat ,cellI, cellJ) {
    var negCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine) negCount++;
        }
    }
    return negCount;
}

  


function renderBoard(board) {
    var strHTML = '';

    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = (cell.isMine) ? 'hidden-bomb' : ''

            strHTML += `\t<td class="${className}"  oncontextmenu="cellMarked(this, ${i}, ${j})"
             onclick="cellClicked(this, ${i}, ${j})"  ></td>\n`
        }
        strHTML += `</tr>\n`
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}



function shownOrMarked(board, i, j) {
    if (board[i][j].isShown === false) return ''
    if (board[i][j].isMarked) {
        
        return
        
    } else if (board[i][j].isMine) {
        return BOMB
    } else return board[i][j].minesAroundCount;
}


function setRandomMine(board, mines) {
    for (var i = 0; i < mines; i++) {
        var cell = getEmptyCell(board)
        cell.isMine = true
    }
}

function getEmptyCell(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j]
            if (!currCell.isMine) emptyCells.push(currCell)
        }
    }
     var randomIdx = getRandomIntExclusive(0, emptyCells.length)
     return emptyCells[randomIdx]
}


function timerCount() {
    ++gTotalOfSec;
    var hours = Math.floor(gTotalOfSec / 3600);
    var minutes = Math.floor((gTotalOfSec - hours * 3600) / 60);
    var seconds = gTotalOfSec - (hours * 3600 + minutes * 60);
    document.querySelector(".timer").innerHTML = hours + ":" + minutes + ":" + seconds;
}

function resetGame() {
    gGame.isOn = false;
    gGame.secsPassed = 0;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gTotalOfSec = 0;
    gGame.lives = 3;
    gIsFirstClick = true;
    clearInterval(gTimeVar)
    
    document.querySelector(".smiley").innerText = '😀';
    initGame()
           
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // function drawNum(board) {
           
            //     var rNum = Math.floor(Math.random() * board.length );
            //     for (var i = 0; i < board.length; i++) {
            //         for (var j = 0; j < board[0].length; j++) {
            //             if (rNum === board[i][j].value && board[i][j].isHit === false) {
            //                 board[i][j].isHit = true;
            //                 gPlayers[0].hitCount += 1;
            //             }
            //         }
            //     }
            // }
}