//Conway's Game of Life
//https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
//last update : 09/04/2021


let nb = 2500;
let w = 10;
let colnb, rownb;
let nextstate = [];
let cells = [];
let canvas;

function setup(){
  canvas = createCanvas(1600, 800);
  canvas.parent('canvasP');
  colnb = width/w;
  rownb = height/w;
  for(let i = 0; i < rownb; i++){
    for(let j = 0; j < colnb; j++){
      let c = new CellC(i, j, w);
      cells.push(c);
      nextstate.push(0);
    }
  }
  for(let i = 0; i < nb; i++){
    let r = floor(random(0, cells.length));
    cells[r].state = 1;
  }
  frameRate(20);
}

function refreshC(i){
  for(c of cells){
    c.state = 0;
  }
  for(let i = 0; i < nb; i++){
    let r = floor(random(0, cells.length));
    cells[r].state = 1;
  }
  nowActivate[treating] = false;
  treating = i;
  nowActivate[i] = true;
}

function draw(){
  background(51);
  for(let i = 0; i < cells.length; i++){
    cells[i].show();
    nextstate[i] = cells[i].renewConway();
  }
  for(let i = 0; i < cells.length; i++){
    cells[i].state = nextstate[i];
  }
}
