document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [ ]
}

win = false

function startGame () {
  // Don't remove this function call: it makes the game work!
  generateBoard()
  lib.initBoard()
  countSurroundingMines(board.cells)
  winListener()

}
function again(){
  if(win) startGame()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin (e) {
  //to shorten the syntax
  cell = board.cells
  
  winArr = cell.map(i =>{
    return i.isProcessed
  })

  for(i = 0; i < cell.length; i++){
    winArr[i] = cell[i].isProcessed
    if(!(winArr.includes(false))){
      win = true
      return lib.displayMessage('You win!')
    }
  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!) 
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  for(i = 0; i < cell.length; i++){
    var surrounding = lib.getSurroundingCells(cell[i].row, cell[i].col)
    
    mineCount = 0
    for(j = 0; j < surrounding.length; j++){
      if(surrounding[j].isMine) mineCount++
    }
    cell[i].surroundingMines = mineCount
  }
}

function winListener(){
  var btn = document.getElementById('again')
  btn.addEventListener('click', again)

  var boardArr = document.getElementsByClassName('board')[0]
  for(i = 0; i < boardArr.children.length; i++){
    boardArr.children[i].addEventListener('click', checkForWin)
    boardArr.children[i].addEventListener('contextmenu', checkForWin)
  }
}


//generate board
function generateBoard(){
  //field size must be at power of 2. (1-6)
  //hard coded 6x6
  row = 1;
  col = 1;

  for(i = 0; i < 36; i++){
    
    board.cells[i] = {
      row: row,
      col: col,
      isMine: generateMines(),
      isMarked: false,
      hidden: true,
      isProcessed: false
    }
    if(col === 6) row++
    col++
    if(col > 6) col = 1
  }
  console.log(board)
}

function generateMines(){
  random = Math.random()
  return true ? random > 0.77 : false
}
