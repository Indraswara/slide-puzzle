const puzzleContainer = document.querySelector('#puzzle-container');
let puzzle = []
let size = 3

generatePuzzle()
randomizePuzzle()
renderPuzzle()

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
        })
    }
    console.log(puzzle)
}

function renderPuzzle(){
    puzzleContainer.innerHTML = ""
    for(let puzzleItem of puzzle){
        puzzleContainer.innerHTML += `
            <div class = "puzzle-item" style = "left: ${puzzleItem.x}px;  top: ${puzzleItem.y}px; " >
                ${puzzleItem.value}
            </div>
        `
    }
}

function randomizePuzzle(){
    const randomValues = getRandomValues()
    console.log(randomValues)
    let i = 0
    for (let puzzleItem of puzzle)
    {
        puzzleItem.value = randomValues[i]
        i++
    }

}

function getRandomValues(){
    const values = []
    for(let i = 1; i <= size*size; i++){
        values.push(i)
    }

    const randomValues = values.sort(() => Math.random() - 0.5)
    return randomValues
}