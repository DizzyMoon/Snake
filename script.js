"use strict";

window.addEventListener("load", start);

// ******** CONTROLLER ********

/*
const head = {
  row: 5,
  col: 5
}
*/

let controls = {
  up: false,
  down: false,
  right: false,
  left: false
}

let queue = [
  {
    row: 5,
    col: 5
  },
  {
    row: 5,
    col: 6
  },
  {
    row: 5,
    col: 7
  }
]

function start() {
  console.log(`Javascript kører`);

  window.addEventListener("keydown", keyPress)
  window.addEventListener("keyup", keyRelease)
  // start ticking
  update();
}


function keyRelease(event) {
  switch (event.key){
    case "a":
    case "ArrowLeft": controls.left = false;
    case "d":
    case "ArrowRight": controls.right = false;
    case "w":
    case "ArrowUp": controls.up = false;
    case "s":
    case "ArrowDown": controls.down = false;
  }
}

function keyPress(event) {
  if (event.key === "ArrowLeft" || event.key === "a"){
    controls.left = true;
  }

  if (event.key === "ArrowRight" || event.key === "d") {
    controls.right = true;
  }

  if (event.key === "ArrowDown" || event.key === "s") {
    controls.down = true;
  }

  if (event.key === "ArrowUp" || event.key === "w") {
    controls.up = true;
  }


  //direction === "left" ? direction = "right" : direction = "left";
}


function update() {
  // setup next tick
  setTimeout(update, 250);
  // TODO: Do stuff
  //writeToCell(player.row, player.col, 0);

  for (const part of queue) {
    writeToCell(part.row, part.col, 0);
  }


  let direction;

  
  if (controls.down){
    direction = "down";
  }

  if (controls.left){
    direction = "left"
  }

  if (controls.up) {
    direction = "up";
  }

  if (controls.right) {
    direction = "right";
  }

  const head = {
    row: queue[queue.length - 1].row,
    col: queue[queue.length - 1 ].col
  }

  queue.push(head);
  queue.shift();

  switch (direction){
    case "left": 
    if (head.col <= 0){
      head.col = model.length;
    }
    head.col--;
    break;

    case "right":
      if (head.col >= model.length - 1){
        head.col = -1;
      }
      head.col++;
      break;

    case "down":
      if (head.row >= model.length - 1) {
        head.row = -1;
      }
      head.row++;
      break;

    case "up":
      if (head.row <= 0) {
        head.row = model.length;
      }
      head.row--;
      break;


      
  }

  

  

  for (const part of queue) {
    writeToCell(part.row, part.col, 1);
  }

  writeToCell(head.row, head.col, 1);
  // display the model in full
  displayBoard();
}

// ******** MODEL ********
const model = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function writeToCell(row, col, value) {
  model[row][col] = value;

}

function readFromCell(row, col) {
  return model[row][col];
}

// ******** VIEW ********

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const index = row * 10 + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}
