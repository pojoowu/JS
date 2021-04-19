//last update : 10/04/2021

let nb = 200;
let w = 10;
let colnb, rownb;
let nextstate = [];
let cells = [];
let canvas, button_refresh, button_start, startingNb, slider;
let starting = true;
let inputB, inputM, inputS;
let buttonC, buttonB, buttonS;
let bArr = [2];
let sArr = [];
let m = 3;

function setup() {
  canvas = createCanvas(800, 800);
  canvas.parent('canvasP');
  button_refresh = select('#refresh');
  button_start = select('#start');
  startingNb = select('#startingNb');
  buttonC = select('#Conway');
  buttonB = select('#Brian');
  buttonS = select('#StarWars');
  slider = select('#frameRate');
  colnb = width / w;
  rownb = height / w;
  inputB = select('#Born');
  inputS = select('#Survive');
  inputM = select('#Gen');
  for (let i = 0; i < rownb; i++) {
    for (let j = 0; j < colnb; j++) {
      let c = new Cell(i, j, w);
      cells.push(c);
      nextstate.push(0);
    }
  }
  for (let i = 0; i < nb; i++) {
    let r = floor(random(0, cells.length));
    cells[r].state = 1;
  }
  frameRate(slider.value());
}

function draw() {
  background(51);
  frameRate(slider.value());
  button_refresh.mousePressed(refresh);
  button_start.mousePressed(startSwitch);
  buttonC.mousePressed(refreshC);
  buttonB.mousePressed(refreshB);
  buttonS.mousePressed(refreshS);
  for (let i = 0; i < cells.length; i++) {
    cells[i].show(m);
    if (starting) {
      nextstate[i] = cells[i].renew(sArr, bArr, m);
    }
  }
  if (starting) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].state = nextstate[i];
    }
  }
}

function mousePressed() {
  let i = floor(mouseY / w);
  let j = floor(mouseX / w);
  if (i >= 0 && i <= rownb - 1 && j <= colnb - 1 && j >= 0) {
    let cellIndex = index(i, j, rownb, colnb);
    cells[cellIndex].state = (cells[cellIndex].state + 1) % m;
  }
}

function touchMoved() {
  let i = floor(mouseY / w);
  let j = floor(mouseX / w);
  if (i >= 0 && i <= rownb - 1 && j <= colnb - 1 && j >= 0) {
    cells[index(i, j, rownb, colnb)].state = 1;
  }
}

function startSwitch() {
  if (starting) {
    button_start.html('Start');
  } else {
    button_start.html('Stop');
  }
  starting = !starting;
}

function refreshC() {
  bArr = [3];
  sArr = [2, 3];
  m = 2;
  for (c of cells) {
    c.state = 0;
  }
  if (startingNb.value()) {
    nb = startingNb.value();
  }
  for (let i = 0; i < nb; i++) {
    let r = floor(random(0, cells.length));
    cells[r].state = 1;
  }
}

function refreshB() {
  bArr = [2];
  sArr = [];
  m = 3;
  for (c of cells) {
    c.state = 0;
  }
  if (startingNb.value()) {
    nb = startingNb.value();
  }
  for (let i = 0; i < nb; i++) {
    let r = floor(random(0, cells.length));
    cells[r].state = 1;
  }
}

function refreshS() {
  bArr = [2];
  sArr = [3, 4, 5];
  m = 4;
  for (c of cells) {
    c.state = 0;
  }
  if (startingNb.value()) {
    nb = startingNb.value();
  }
  for (let i = 0; i < nb; i++) {
    let r = floor(random(0, cells.length));
    cells[r].state = 1;
  }
}

function refresh() {
  let b = inputB.value();
  let s = inputS.value();
  if (inputM.value() || inputM.value() === 0) {
    m = inputM.value();
  }
  if (b) {
    bArr = [];
    while (b > 0) {
      bArr.push(b % 10);
      b = floor(b / 10);
    }
  }
  if (s) {
    sArr = [];
    while (s > 0) {
      sArr.push(s % 10);
      s = floor(s / 10);
    }
  }
  for (c of cells) {
    c.state = 0;
  }
  if (startingNb.value()) {
    nb = startingNb.value();
  }
  for (let i = 0; i < nb; i++) {
    let r = floor(random(0, cells.length));
    cells[r].state = 1;
  }
}

function Cell(i, j, w) {
  this.w = w;
  this.i = i;
  this.j = j; //generations
  this.state = 0;
  let stateOn = 1;
  let stateOff = 0;


  this.show = function(m) {
    let x = this.j * w;
    let y = this.i * w;
    stroke(0);
    let halfGen = floor(m / 2);
    if (this.state === 0) {
      fill(51);
    } else if (m > 2) {
      let r = floor((255 * m - 306 - 204 * this.state) / (m - 2));
      let g = floor((255 * m - 280 - 230 * this.state) / (m - 2));
      fill(r, g, 0);
    } else {
      fill(255);
    }
    rect(x, y, w, w);
  }

  this.renew = function(ss, bb, m) {
    let count = 0;
    for (let ni = -1; ni < 2; ni++) {
      for (let nj = -1; nj < 2; nj++) {
        if (ni != 0 || nj != 0) {
          if (cells[index(this.i + ni, this.j + nj, rownb, colnb)].state === stateOn) {
            count += 1;
          }
        }
      }
    }
    if (this.state === stateOn) {
      if (ss.includes(count)) {
        return stateOn;
      } else {
        return 2 % m;
      }
    } else if (this.state === stateOff) {
      if (bb.includes(count)) {
        return stateOn
      } else {
        return stateOff
      }
    } else {
      return (this.state + 1) % m;
    }
  }
}
