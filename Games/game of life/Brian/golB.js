//Conway's Game of Life
//https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
//last update : 09/04/2021


let nb = 5000;
let w = 10;
let colnb, rownb;
let nextstate = [];
let cells = [];
let canvas, button, startingNb;

function setup(){
  canvas = createCanvas(1600, 800);
  canvas.parent('canvasP');
  button = select('#refresh');
  startingNb = select('#startingNb');
  colnb = width/w;
  rownb = height/w;
  for(let i = 0; i < rownb; i++){
    for(let j = 0; j < colnb; j++){
      let c = new CellB(i, j, w);
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

function refreshC(){
  for(c of cells){
    c.state = 0;
  }
  if(startingNb.value()){
    nb = startingNb.value();
  }
  for(let i = 0; i < nb; i++){
    let r = floor(random(0, cells.length));
    cells[r].state = 1;
  }
}

function draw(){
  background(51);
  button.mousePressed(refreshC);
  for(let i = 0; i < cells.length; i++){
    cells[i].show();
    nextstate[i] = cells[i].renewB();
  }
  for(let i = 0; i < cells.length; i++){
    cells[i].state = nextstate[i];
  }
}
