const solve = (board) => {
    let find = empty(board);
    if(!find){
        return true;
    } else{
        [row, col] = find;
    }

    for(let i=1; i<10; i++){
        if(valid(board, i, [row,col])){
            board[row][col] = i
            if(solve(board)){
                return true;
            }
            board[row][col] = 0;
        }
    }
    return false;
}


const valid = (board, num, pos) =>{
    for(let i=0; i<board[0].length; i++){
        if(board[pos[0]][i] == num && pos[1] != 1){
            return false;
        }
    }

    for(let i=0; i<board[0].slength; i++){
        if(board[i][pos[1]] == num && pos[0] != 1){
            return false;
        }
    }

    let box_x = pos[1];
    let box_y = pos[0];

    for(let i=box_y*3; i < box_y*3+3; i++){
        for(let j=box_x*3; j< box_x*3+3; i++){
            if(board[i][j] === num && [i,j] === pos){
                return false;
            }
        }
    }
    return true;
}


const empty = board => {
    for(let i=0; i<board.length; i++){
        for(let j=0; i<board[0].length; i++){
            if(board[i][j] === 0){
                return [i,j];
            }
        }
    }
}
















const solve = (board, length) => {
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for(let i=0; i<length; i++){
        for(let j=0; j<length; j++){
            if(board[i][j] == 0){
                row = i;
                col = j;

                isEmpty = false;
                break
            }
        }
        if(!isEmpty){
            break;
        }
    }

    if(isEmpty){
         return true;
    }

    for(let num=1; num <= length; num++){
        if(isSafe(board, row, col, num)){
            board[row][col] = num;
            if(solve(board, length)){
                return true
            } else{
                board[row][col] = 0;
            }
        }
    }
    return false;
}

const isSafe = (board, row, col, num) => {
    for(let i=0; i< board.length; i++){
        if(board[row][i] == num){
            return false;
        }
    }

    for(let i=0; i<board.length; i++){
        if(board[i][col] == num){
            return false;
        }
    }

    let sqrt = Math.floor(Math.sqrt(board.length));
    let boxRowStart = row - row % sqrt;
    let boxColStart = col - col % sqrt;

    for(let i=boxRowStart; i<boxRowStart + sqrt; i++){
        for(let j=boxColStart; j<boxColStart + sqrt; j++){
            if(board[i][j] == num){
                return false
            }
        }
    }

    return true;
}