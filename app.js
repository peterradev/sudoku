const easy = [
  "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
const medium = [
  "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
  "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
const hard = [
  "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
  "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];

let timer;
let timeRemaining;
let lives;
let selectedNum;
let selectedTile;
let disableSelect = false;

window.onload = () => {
  // Run startgame function
  id('start-btn').addEventListener('click', startGame);
  for(let i =0; i<id('num-container').children.length; i++){
    id('num-container').children[i].addEventListener('click', () => {
      if(!disableSelect){
        if(id('num-container').children[i].classList.contains('selected')){
          this.classList.remove('selected');
          selectedNum = null;
        } else {
          for(let i = 0; i<9; i++){
            id('num-container').children[i].classList.remove('selected')
          }
          id('num-container').children[i].classList.add('selected');
          selectedNum = this;
          updateMove();
        }
      }
    });
  }
}


const generateBoard = (board) => {
  clearPrevious();
  // let used to increment tiles ids
  let idCount = 0
  for(let i=0; i< 81; i++){
    let tile = document.createElement('p');
    if(board.charAt(i) !== '-'){
      tile.textContent = board.charAt(i)
    } else{

    }
    // Assign tile id
    tile.id = idCount;
    idCount++;
    // Add tile class
    tile.classList.add('tile');
    if((tile.id > 17 && tile.id <27) ||(tile.id>44 && tile.id<54)){
      tile.classList.add("bottomBorder")
    }
    if((tile.id + 1) % 9 === 3 || (tile.id + 1) % 9 == 6) {
      tile.classList.add('right-border');
    }

    id('board').appendChild(tile);
  }
}

const clearPrevious = () => {
  let tiles = qsa('.tile')
  // REmove each tile
  for(let i=0; i<tiles.length; i++){
    tiles[i].remove();
  }

  // If there is a timer clear it
  if (timer) clearTimeout(timer);
  // Deselect any numbers
  for(let i=0; i< id('num-container').children.length; i++){
    id('num-container').children[i].classList.remove('selected');
  }

  selectedTile = null;
  selectedNum = null;
}


const id = (id) => {
  return document.getElementById(id);
}

const qs = (selector) => {
  return document.querySelector(selector)
}

const qsa = (selector) => {
  return document.querySelectorAll(selector)
}

const startGame = () => {
  console.log("start")
  let board;
  if(id('diff-1').checked) board = easy[0];
  if(id('diff-2').checked) board = medium[0];
  if(id('diff-3').checked) board = hard[0];

  lives = 3;
  disableSelect = false
  // id('lives').textContent = "Lives Remaining: 3"
  generateBoard(board);

  startTime();
  if(id('theme-1').checked){
    qs('body').classList.remove('dark');
  } else{
    qs('body').classList.add('dark')
  }
  id('num-container').classList.remove("hidden");
}

const startTime = () => {
  if(id('time-1').checked) timeRemaining = 180;
  else if (id('time-2').checked) timeRemaining = 300;
  else timeRemaining = 600;
  id('timer').textContent = timeConversion(timeRemaining);
  timer = setInterval(() => {
    timeRemaining--;
    if(timeRemaining === 0) endGame();
    id('timer').textContent = timeConversion(timeRemaining);
  }, 1000)
}

const timeConversion = (time) => {
  let minutes = Math.floor(time / 60);
  if(minutes < 10) minutes = "0" + minutes;
  let seconds = time % 60;
  if(seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
}