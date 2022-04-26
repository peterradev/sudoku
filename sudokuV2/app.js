const board = document.getElementById('board');
const button = document.getElementById('solve')
const squares = 81;
let boardArray = [];
let numbers = [];
const gui = document.getElementById('solved');

let number = [ [7,8,0,4,0,0,1,2,0],
[6,0,0,0,7,5,0,0,9],
[0,0,0,6,0,1,0,7,8],
[0,0,7,0,4,0,2,6,0],
[0,0,1,0,5,0,9,3,0],
[9,0,4,0,6,0,0,0,5],
[0,7,0,3,0,0,0,1,2],
[1,2,0,0,0,7,4,0,0],
[0,4,9,2,0,6,0,0,7] ];

for(let i=0; i<squares; i++){
    const inputSquare = document.createElement('input');
    inputSquare.setAttribute('type', 'number');
    inputSquare.setAttribute('min', '1');
    inputSquare.setAttribute("max", '9');
    board.append(inputSquare)
}

const joinNums = (e) => {
	e.preventDefault();
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
        if(input.value){
            boardArray.push(input.value)
        } else{
            boardArray.push('0');
        }
    })
    console.log(boardArray);
    joinBoard();
	console.log(numbers)
    let n = 9;
    if(solve(numbers, n)){
		display(numbers);
	}
    console.log(numbers);
    // // clearBoard();
}


const clearBoard = () => {
    for(let i=0; i<gui.children.length; i++){
        gui.children[i].remove
    }
}

const display = (board) => {
    let idCount = 0
    for(let i=0; i<board.length; i++){
        for(let j=0; j<board.length; j++){
            let tile = document.createElement('p');  
            tile.classList.add('tile');
            tile.textContent = board[i][j];
            tile.id = idCount;
            idCount++;
            tile.classList.add('tile');
            if((tile.id > 17 && tile.id <27) ||(tile.id>44 && tile.id<54)){
                tile.classList.add("bottomBorder")
            }
            if((tile.id + 1) % 9 === 3 || (tile.id + 1) % 9 == 6) {
                tile.classList.add('right-border');
            }

            gui.appendChild(tile);
        }
    }
}

function isSafe(board, row, col, num){
	// Row has the unique (row-clash)
	for(let d = 0; d < board.length; d++){
		// Check if the number we are trying to
		// place is already present in
		// that row, return false;
		if (board[row][d] == num){
			return false;
		}
	}

	// Column has the unique numbers (column-clash)
	for(let r = 0; r < board.length; r++){
		// Check if the number
		// we are trying to
		// place is already present in
		// that column, return false;
		if (board[r][col] == num){
			return false;
		}
	}

	// Corresponding square has
	// unique number (box-clash)
	let sqrt = Math.floor(Math.sqrt(board.length));
	let boxRowStart = row - row % sqrt;
	let boxColStart = col - col % sqrt;

	for(let r = boxRowStart; r < boxRowStart + sqrt ; r++){
		for(let d = boxColStart; d < boxColStart + sqrt; d++) {
			if (board[r][d] == num){
				return false;
			}
		}
	}

	// If there is no clash, it's safe
	return true;
}

function solve(board, n)
{
	let row = -1;
	let col = -1;
	let isEmpty = true;
	for(let i = 0; i < n; i++){
		for(let j = 0; j < n; j++){
			if (board[i][j] == 0){
				row = i;
				col = j;

				// We still have some remaining
				// missing values in Sudoku
				isEmpty = false;
				break;
			}
		}
		if (!isEmpty){
			break;
		}
	}

	// No empty space left
	if (isEmpty){
		return true;
	}
	// Else for each-row backtrack
	for(let num = 1; num <= n; num++){
		if (isSafe(board, row, col, num)){
			board[row][col] = num;
			if (solve(board, n)){
				// print(board, n);
				return true;
			}
			else{
				// Replace it
				board[row][col] = 0;
			}
		}
	}
	return false;
}

const joinBoard = () => {

	while(boardArray.length)
		numbers.push(boardArray.splice(0,9))
    // for(let i=0; i<9; i++){
    //     const sliced = boardArray.splice(i, 9);
    //     numbers.push(sliced);
    //     boardArray.splice(0,9);

	// 	for(let j=0; j < 9; j++){
	// 		numbers[i][j] = boardArray[i + j]
	// 	}
    // }
    console.log(numbers);
}











button.addEventListener('click', joinNums);