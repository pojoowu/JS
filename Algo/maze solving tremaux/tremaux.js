//maze generator: https://en.wikipedia.org/wiki/Maze_generation_algorithm
//maze solving by Trémaux's algorithm: https://en.wikipedia.org/wiki/Maze-solving_algorithm
//last update : 08/04/2021

let w = 20;
let colnb, rownb;
let cells = [];
let current, currentWay;
let stack = [];
let canvas;
//used for maze solving only
let stackWay = [];
let path_found = false;
let fr = 50;
//
function setup() {
  canvas = createCanvas(800, 800);
  canvas.parent('#canvasP');
  colnb = floor(width / w);
  rownb = floor(height / w);
  for (let i = 0; i < rownb; i++) {
    for (let j = 0; j < colnb; j++) {
      let c = new Cell(i, j);
      cells.push(c);
    }
  }
  current = cells[0];
  currentWay = cells[0];
  frameRate(fr);
  stack.push(current);
  while (stack.length > 0) {
    current.visited = true;
    current.highlight();
    let next = current.findNext();
    if (next) {
      next.visited = true
      stack.push(next);
      eraseWall(current, next);
      current = next;
    } else if (stack.length > 0) {
      let c = stack.pop();
      current = c;
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < cells.length; i++) {
    cells[i].show();
  }
  currentWay.marked = true;
  currentWay.highlight();
  if (!path_found) {
    let nextWay = currentWay.findNextWay();
    if (nextWay) {
      stackWay.push(currentWay);
      currentWay.cross = false;
      if (nextWay === cells[cells.length - 1]) {
        path_found = true; //if we find the end we follow the road back to the beginning
        currentWay = nextWay;
        stackWay.push(nextWay);
      } else { //if there is no way out then we retreat until we find another path
        currentWay = nextWay;
      }
    } else {
      currentWay.cross = true;
      currentWay = stackWay.pop();
    }
  } else if (stackWay.length > 0) {
    let sol = stackWay.pop();
    sol.is_solution = true;
  }
}

function index(i, j) { //a function to calculate the indices
  if (i < 0 || j < 0 || i > rownb - 1 || j > colnb - 1) {
    return -1;
  }
  return j + i * rownb;
}

function eraseWall(c, d) { //first one for current second one for next
  if (d.i - c.i === -1) { //next is above current
    d.walls[2] = false;
    c.walls[0] = false;
  }
  if (d.j - c.j === -1) { //next is at left
    d.walls[3] = false;
    c.walls[1] = false;
  }
  if (d.i - c.i === 1) { //next is at bottom
    d.walls[0] = false;
    c.walls[2] = false;
  }
  if (d.j - c.j === 1) { //next is at right
    d.walls[1] = false;
    c.walls[3] = false;
  }
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.visited = false;
  this.walls = [true, true, true, true];
  this.wallsNb = this.walls.length;
  //used for maze solving only
  this.marked = false;
  this.is_solution = false;
  this.cross = false;
  //
  this.show = function() {
    let x = this.j * w;
    let y = this.i * w;
    stroke(255);
    strokeWeight(1);
    if (this.walls[0]) {
      line(x, y, x + w, y); //top line
    }
    if (this.walls[1]) {
      line(x, y, x, y + w); //left line
    }
    if (this.walls[2]) {
      line(x, y + w, x + w, y + w); //bottom line
    }
    if (this.walls[3]) {
      line(x + w, y, x + w, y + w); //right line
    }
    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }
    if (this.marked) {
      noStroke();
      fill(0, 0, 255, 100);
      rect(x, y, w, w);
    }
    if (this.cross) {
      stroke(255, 0, 0);
      strokeWeight(4);
      line(x, y, x + w, y + w);
      line(x, y + w, x + w, y);
    }
    if (this.is_solution) {
      noStroke();
      fill(51);
      rect(x, y, w, w);
    }
  }

  this.findNext = function() {
    let nbors = [];
    let topNbor = cells[index(i - 1, j)];
    let leftNbor = cells[index(i, j - 1)];
    let bottomNbor = cells[index(i + 1, j)];
    let rightNbor = cells[index(i, j + 1)];
    if (topNbor && !topNbor.visited) {
      nbors.push(topNbor);
    }
    if (leftNbor && !leftNbor.visited) {
      nbors.push(leftNbor);
    }
    if (bottomNbor && !bottomNbor.visited) {
      nbors.push(bottomNbor);
    }
    if (rightNbor && !rightNbor.visited) {
      nbors.push(rightNbor);
    }
    if (nbors.length > 0) {
      let r = floor(random(0, nbors.length));
      return nbors[r];
    } else {
      return undefined;
    }
  }
  //used for maze solving only
  this.findNextWay = function() {
    let noWall = [];
    let topNbor = cells[index(i - 1, j)];
    let leftNbor = cells[index(i, j - 1)];
    let bottomNbor = cells[index(i + 1, j)];
    let rightNbor = cells[index(i, j + 1)];
    for (let k = 0; k < 4; k++) {
      if (!this.walls[k]) {
        if (k === 0 && !topNbor.marked) {
          noWall.push(k);
        }
        if (k === 1 && !leftNbor.marked) {
          noWall.push(k);
        }
        if (k === 2 && !bottomNbor.marked) {
          noWall.push(k);
        }
        if (k === 3 && !rightNbor.marked) {
          noWall.push(k);
        }
      }
    }
    let nl = noWall.length;
    if (nl > 0) {
      let r = floor(random(0, nl));
      if (noWall[r] === 0) {
        return cells[index(i - 1, j)];
      }
      if (noWall[r] === 1) {
        return cells[index(i, j - 1)];
      }
      if (noWall[r] === 2) {
        return cells[index(i + 1, j)];
      }
      if (noWall[r] === 3) {
        return cells[index(i, j + 1)];
      }
    } else {
      return undefined;
    }
  }
  //
  this.highlight = function() {
    let x = this.j * w;
    let y = this.i * w;
    noStroke();
    fill(0, 255, 0);
    rect(x, y, w, w);
  }
}
