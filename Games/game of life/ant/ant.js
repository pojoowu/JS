//Langton's Ant : https://en.wikipedia.org/wiki/Langton%27s_ant
//07/04/2021

let ant1;
let cells = [];
let w = 5;
let cols, rows;
let canvas, slider;

function setup() {
  canvas = createCanvas(1600, 800);
  canvas.parent('canvasP');
  slider = select('#frameRate');
  cols = width / w;
  rows = height / w;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let c = new cell(i, j);
      cells.push(c);
    }
  }
  ant1 = new ant(floor(cols / 3), floor(rows / 3));
  background(255);
  for (let i = 0; i < cells.length; i++) {
    cells[i].show();
  }
}

function draw() {
  frameRate(slider.value());
  for (let k = 0; k < 100; k++) {
    let c = cells[ant1.pos.x + ant1.pos.y * cols];
    if (c.state) {
      ant1.turnRight();
      c.state = 0;
    } else {
      ant1.turnLeft();
      c.state = 1;
    }
    ant1.moveForward();
    ant1.show();
    c.show();
  }
}

function ant(x, y) {
  this.pos = createVector(x, y);
  this.dir = 3; //0=top 1=right 2=bottom 3=left

  this.show = function() {
    noStroke();
    fill(255, 0, 0, 100);
    rect(this.pos.x * w, this.pos.y * w, w, w);
  }

  this.turnLeft = function() {
    this.dir += 1;
    this.dir = this.dir % 4;
  }

  this.turnRight = function() {
    this.dir--;
    if (this.dir < 0) {
      this.dir = 3;
    }
  }

  this.moveForward = function() {
    if (this.dir === 0) {
      this.pos.y--;
      if (this.pos.y < 0) {
        this.pos.y = rows - 1;
      }
    }
    if (this.dir === 1) {
      this.pos.x++;
      if (this.pos.x > cols - 1) {
        this.pos.x = 0;
      }
    }
    if (this.dir === 2) {
      this.pos.y++;
      if (this.pos.y > rows - 1) {
        this.pos.y = 0;
      }
    }
    if (this.dir === 3) {
      this.pos.x--;
      if (this.pos.x < 0) {
        this.pos.x = cols - 1;
      }
    }
  }
}

function cell(i, j) {
  this.i = i;
  this.j = j;
  this.state = 0; //0 means it's black 1 means it's white

  this.show = function() {
    stroke(0);
    if (this.state) {
      fill(0);
    } else {
      fill(255);
    }
    rect(j * w, i * w, w, w);
  }
}
