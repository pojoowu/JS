//maze generator: https://en.wikipedia.org/wiki/Maze_generation_algorithm
//maze solving by depth-first: https://en.wikipedia.org/wiki/Maze-solving_algorithm

let w = 20;
let colnb, rownb;
let cells = [];
let current, currentWay;
let stack = [];
let canvas;
//used for maze solving only
let stackWay = [];
let path_found = false;
let solWay = [];
//
function setup() {
  canvas = createCanvas(800, 800);
  canvas.parent('#canvasP');
  colnb = floor(width/w);
  rownb = floor(height/w);
  for(let i = 0; i < rownb; i++){
    for(let j = 0; j < colnb; j++){
      let c = new Cell(i, j);
      cells.push(c);
    }
  }
  current = cells[0];
  currentWay = cells[0];
  frameRate(200);
  stack.push(current);
  currentWay.path.push(cells[0]);
  stackWay.push(cells[0]);
  while(stack.length>0){
    current.visited = true;
    current.highlight();
    let next = current.findNext();
    if(next){
      next.visited = true
      stack.push(next);
      eraseWall(current, next);
      current = next;
    } else if(stack.length > 0){
      let c = stack.pop();
      current = c;
    //used for maze solving only
    }
  }
}

function draw() {
  background(0);
  for(let i = 0; i < cells.length; i++){
    cells[i].show();
  }

  if(!path_found){
    currentWay = stackWay.pop();
    currentWay.highlight();
    if(currentWay === cells[cells.length-1]){
      path_found = true;
      solWay = currentWay.path;
    }
    let nextWay = [...currentWay.findNextWay()];
    if(nextWay.length > 0){
      for(let i = 0; i < nextWay.length; i++){
        nextWay[i].path = [...currentWay.path];
        nextWay[i].path.push(nextWay[i]);
        stackWay.push(nextWay[i]);
      }
    }
  }else if(solWay.length > 0){
    let c = solWay.pop();
    c.is_solution = true;
  }
}

function index(i, j){           //a function to calculate the indices
  if(i<0 || j < 0 || i > rownb-1 || j > colnb-1){
    return -1;
  }
  return j+i*rownb;
}

function eraseWall(c, d){       //first one for current second one for next
  if(d.i - c.i === -1){         //next is above current
    d.walls[2] = false;
    c.walls[0] = false;
  }
  if(d.j - c.j === -1){         //next is at left
    d.walls[3] = false;
    c.walls[1] = false;
  }
  if(d.i - c.i === 1){          //next is at bottom
    d.walls[0] = false;
    c.walls[2] = false;
  }
  if(d.j - c.j === 1){          //next is at right
    d.walls[1] = false;
    c.walls[3] = false;
  }
}

function Cell(i, j){
  this.i = i;
  this.j = j;
  this.visited = false;
  this.walls = [true, true, true, true];
  this.wallsNb = this.walls.length;
  //used for maze solving only
  this.is_solution = false;
  this.path = [];
  //
  this.show = function() {
    let x = this.j*w;
    let y = this.i*w;
    stroke(255);
    if(this.walls[0]){
      line(x, y , x+w, y);//top line
    }
    if(this.walls[1]){
      line(x, y, x, y+w);//left line
    }
    if(this.walls[2]){
      line(x, y+w, x+w, y+w);//bottom line
    }
    if(this.walls[3]){
      line(x+w, y, x+w, y+w);//right line
    }
    if(this.visited){
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }
    if(this.path.length>0){
      noStroke();
      fill(0, 0, 255, 100);
      rect(x, y, w, w);
    }
    if(this.cross){
      stroke(255, 0, 0);
      strokeWeight(4);
      line(x, y, x+w, y+w);
      line(x, y+w, x+w, y);
    }
    if(this.is_solution){
      noStroke();
      fill(51);
      rect(x, y, w, w);
    }
  }

  this.findNext = function() {
    let nbors = [];
    let topNbor = cells[index(i-1, j)];
    let leftNbor = cells[index(i,j-1)];
    let bottomNbor = cells[index(i+1, j)];
    let rightNbor = cells[index(i, j+1)];
    if(topNbor && !topNbor.visited){
      nbors.push(topNbor);
    }
    if(leftNbor && !leftNbor.visited){
      nbors.push(leftNbor);
    }
    if(bottomNbor && !bottomNbor.visited){
      nbors.push(bottomNbor);
    }
    if(rightNbor && !rightNbor.visited){
      nbors.push(rightNbor);
    }
    if(nbors.length > 0){
      let r = floor(random(0, nbors.length));
      return nbors[r];
    } else{
      return undefined;
    }
  }
  //used for maze solving only
  this.findNextWay = function() {
    let noWall = [];
    let topNbor = cells[index(i-1, j)];
    let leftNbor = cells[index(i,j-1)];
    let bottomNbor = cells[index(i+1, j)];
    let rightNbor = cells[index(i, j+1)];
    for(let k = 0; k < 4; k++){
      if(!this.walls[k]){
        if(k === 0 && (topNbor.path.length === 0 || topNbor.path.length>this.path.length+1)){
          noWall.push(topNbor);
        }
        if(k === 1 && (leftNbor.path.length === 0 || leftNbor.path.length>this.path.length+1)){
          noWall.push(leftNbor);
        }
        if(k === 2 && (bottomNbor.path.length === 0 || bottomNbor.path.length>this.path.length+1)){
          noWall.push(bottomNbor);
        }
        if(k === 3 && (rightNbor.path.length === 0 || rightNbor.path.length>this.path.length+1)){
          noWall.push(rightNbor);
        }
      }
    }
    return noWall;
  }
  //
  this.highlight = function(){
    let x = this.j*w;
    let y = this.i*w;
    noStroke();
    fill(0, 255, 0);
    rect(x, y, w, w);
  }
}
