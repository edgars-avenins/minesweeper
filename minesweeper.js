/*
Functions are placed in the order they are being called
indented functions represent that they are called from the function above them
 */



//variables with global scope
var minesGenerated = 0
var mines = 0
var difficulty = 4
var board = {
  cells: [ ]
}

var goodCell = new Audio('sounds/goodCell.mp3')
var badCell = new Audio('sounds/badCell.mp3')


document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!


function again(){ // initialize function call sequence that will reset the game
  resetBoard()
  resetvalues()
  
  startGame()
}

  function resetBoard(){ // reset the html 
    document.getElementsByClassName('board')[0].innerHTML = ''
  }

  function resetvalues(){ // global values that have to be reset to zero or empty
    minesGenerated = 0
    board = {
      cells: [ ]
    }
  }


function startGame () { // function that calls all the required functions in order to start the game
  setMineCount()
  generateBoard()
  lib.initBoard()
  countSurroundingMines(board.cells)
  winListener()
  getDifficultyButtons()
}

  function checkForWin () { // win condition
    //to shorten the syntax
    cell = board.cells

    winArr = cell.map(i =>{
      return i.isProcessed
    })

    for(i = 0; i < cell.length; i++){
      winArr[i] = cell[i].isProcessed
      if(!(winArr.includes(false))){
        document.getElementById('secret').style.display = 'block'
        return lib.displayMessage('You win!')
      }
    }
  }

  function setMineCount(){ // set mine count depending on difficulty 
    if(difficulty === 4){
      mines = 3
    }else if(difficulty === 5){
      mines = 6
    }else if(difficulty === 6){
      mines = 9
    }
  }

  function generateBoard(){//generate board
    //field size must be at power of 2. (1-6)
    row = 1;
    col = 1;

    for(i = 0; i < difficulty*difficulty; i++){
      board.cells[i] = {
        row: row,
        col: col,
        isMine: getMines(),
        isMarked: false,
        hidden: true,
        isProcessed: false
      }
      if(col === difficulty) row++
      col++
      if(col > difficulty) col = 1
    }
    //console.log(board)
    document.getElementById('notes').innerHTML = minesGenerated
  }

    function getMines(){ //generates mines randomly while making sure that there isnt too many
      randomValue = Math.random()
      if(randomValue > 0.77 && minesGenerated < mines){
        minesGenerated++
        return true
      }
      return false
    }

  function countSurroundingMines (cell) { // mine count tips on safe cells
    for(i = 0; i < cell.length; i++){
      var surrounding = lib.getSurroundingCells(cell[i].row, cell[i].col)
      
      mineCount = 0
      for(j = 0; j < surrounding.length; j++){
        if(surrounding[j].isMine) mineCount++
      }
      cell[i].surroundingMines = mineCount
    }
  }

  function winListener(){ // each cell checks if win condition is true
    activateAgainBtn()

    var boardArr = document.getElementsByClassName('board')[0]
    for(i = 0; i < boardArr.children.length; i++){
      boardArr.children[i].addEventListener('click', checkForWin)
      boardArr.children[i].addEventListener('contextmenu', checkForWin)
      boardArr.children[i].addEventListener('contextmenu', updateMineDisplay)
    }
  }
    function activateAgainBtn(){ // activate again button
      var btn = document.getElementById('again')
      btn.addEventListener('click', again)
    }

    function updateMineDisplay(e){
     cellClassList = e.target.classList

     for(i = 0; i < cellClassList.length; i++){
       if(cellClassList[i] == 'mine') minesGenerated--
     }
     document.getElementById('notes').innerHTML = minesGenerated
    }

  function getDifficultyButtons(){ // select all buttons, but in this case hard core that first 3 are the ones we look for, asign eventlistener to each
    var getAllButtons = document.querySelectorAll('button')
    //console.log(getAllButtons[0].innerHTML)
    for(i = 0; i < 3; i++){
      getAllButtons[i].addEventListener('click', changeDifficulty)
    }
  }

    function changeDifficulty(e){ // change difficulty based on where the click occured
      //console.log(e.target.innerHTML)
      if(e.target.innerHTML === 'EASY'){
        difficulty = 4
        again()
      }else if(e.target.innerHTML === 'MEDIUM'){
        difficulty = 5
        again()
      }else if(e.target.innerHTML === 'HARD'){
        difficulty = 6
        again()
      }else console.log('Parent function for loop scope is wrong')
    }
