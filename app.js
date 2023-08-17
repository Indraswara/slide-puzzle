const puzzleContainer = document.querySelector('#puzzle-container');
let puzzle = []
let size = 3

generatePuzzle()
randomizePuzzle()
renderPuzzle()
handleInput()


function getRow(pos){
    return Math.ceil(pos/size)
}
function getCol(pos){
    const col = pos%3
    if(col === 0){
        return size
    }
    return col
}
function generatePuzzle(){
    for(let i = 1; i<=size*size; i++){
        puzzle.push({
            value: i, 
            position: i, 
            x: (getCol(i)-1) * 200,
            y: (getRow(i)-1) * 200,
            disable: false, 
        })
    }
}

function renderPuzzle(){
    puzzleContainer.innerHTML = ""
    for(let puzzleItem of puzzle){
        if(puzzleItem.disable) continue
        puzzleContainer.innerHTML += `
            <div class = "puzzle-item" style = "left: ${puzzleItem.x}px;  top: ${puzzleItem.y}px; " >
                ${puzzleItem.value}
            </div>
        `
    }
}

function randomizePuzzle(){
    const randomValues = getRandomValues()
    let i = 0
    for (let puzzleItem of puzzle)
    {
        puzzleItem.value = randomValues[i]
        i++
    }

    const puzzleWithValueOf9 = puzzle.find(item => item.value === 9 )
    puzzleWithValueOf9.disable = true
}

function getRandomValues(){
    const values = []
    for(let i = 1; i <= size*size; i++){
        values.push(i)
    }

    const randomValues = values.sort(() => Math.random() - 0.5)
    return randomValues
}

function handleInput(){
    document.addEventListener('keydown', handleKeyDown)
}

function handleKeyDown(e){
    switch(e.key){
        case 'ArrowLeft' :{
            moveLeft(); 
            break;
        }
        case 'ArrowRight' :{
            moveRight(); 
            break;
        }
        case 'ArrowUp' :{
            moveUp(); 
            break;
        }
        case 'ArrowDown' :{
            moveDown();
            break; 
        }
    }
    renderPuzzle()
    console.log(puzzle)
    gameOver(puzzle)
}

function moveLeft(){
    const emptyPuzzle = getEmptyPuzzle()
    const rightPuzzle = getRightPuzzle()
    if(rightPuzzle){
        swapPosition(emptyPuzzle, rightPuzzle, true)
    }
}
function moveRight(){
    const emptyPuzzle = getEmptyPuzzle()
    const leftPuzzle = getLeftPuzzle()
    if(leftPuzzle){
        swapPosition(emptyPuzzle, leftPuzzle, true)
    }
}
function moveUp(){
    const emptyPuzzle = getEmptyPuzzle()
    const downPuzzle = getBelowPuzzle()
    if(downPuzzle){
        swapPosition(emptyPuzzle, downPuzzle, false)
    }
}
function moveDown(){
    const emptyPuzzle = getEmptyPuzzle()
    const topPuzzle = getAbovePuzzle()
    if(topPuzzle){
        swapPosition(emptyPuzzle, topPuzzle, false)
    }
}

function swapPosition(firstPuzzle, secondPuzzle, isX = false){
    let temp = firstPuzzle.position
    firstPuzzle.position = secondPuzzle.position
    secondPuzzle.position = temp

    if(isX){
        temp = firstPuzzle.x
        firstPuzzle.x = secondPuzzle.x
        secondPuzzle.x = temp
    } else{
        temp = firstPuzzle.y
        firstPuzzle.y = secondPuzzle.y
        secondPuzzle.y = temp
    }
}


function getRightPuzzle(){
    const emptyPuzzle = getEmptyPuzzle()
    const isRightEdge = getCol(emptyPuzzle.position) === size
    if(isRightEdge){
        return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position + 1)
    return puzzle 
    
}
function getLeftPuzzle(){
    const emptyPuzzle = getEmptyPuzzle()
    const isLeftEdge = getCol(emptyPuzzle.position) === 1
    if(isLeftEdge){
        return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position - 1)
    return puzzle 
}
function getAbovePuzzle(){
    const emptyPuzzle = getEmptyPuzzle()
    const isTopEdge = getRow(emptyPuzzle.position) === 1
    if(isTopEdge){
        return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position - size)
    return puzzle 
}
function getBelowPuzzle(){
    const emptyPuzzle = getEmptyPuzzle()
    const isBottomEdge = getRow(emptyPuzzle.position) === size
    if(isBottomEdge){
        return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position + size)
    return puzzle 
}

function getEmptyPuzzle(){
    return puzzle.find(item => item.disable)
}

function getPuzzleByPos(pos){
    return puzzle.find(item => item.position === pos )
}

function gameOver(puzzle){
    const isGameOver = puzzle.every(item => item.value === item.position)
    if(isGameOver){
        const puzzleWithValueOf9 = puzzle.find(item => item.value ===9 )
        puzzleWithValueOf9.disable = false
        renderPuzzle()
        //alert if you win the game
        winTheGame()
    }
 
}


function winTheGame(){
    let alertShown = false;
    setTimeout(() => {
      if (!alertShown) {
        alert("You Win");
        alertShown = true;
      }
    }, 1000); 

}



//reset Game 

function resetGame(){
    puzzle = []
    generatePuzzle()
    randomizePuzzle()
    renderPuzzle()
    handleInput()
}

const resetButton = document.getElementById('resetButton')
resetButton.addEventListener("click", resetGame); // No parentheses here


//debuggin or cheat
function cheat(puzzle){
    puzzle.every(item => item.value = item.position)
    puzzle.forEach(item => item.disable = false)
    puzzle[8].disable = true
    renderPuzzle()
}

function cheatLaunch()
{
    cheat(puzzle)
    //winTheGame()
}


const cheatButton = document.getElementById('cheatButton')
cheatButton.addEventListener("click", cheatLaunch); // No parentheses here

