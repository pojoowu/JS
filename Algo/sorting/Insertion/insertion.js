//last update : 08/04/2021

let bars = [];
let current = 0;
let next = 0;
let just_treating = 0;
let completeHighlight = 0;
let completed = false;

function setup() {
  createCanvas(1000, 800);
  let long = [];
  for (let i = 0; i <= width; i++) {
    long.push(i * height / width);
  }
  randomShuffleArray(long);
  for (let i = 0; i <= width; i++) {
    let b = new bar(i, long[i]);
    bars.push(b);
  }
  frameRate(300);
}

function draw() {
  background(51);
  for (b of bars) {
    b.show(height);
  }
  for (let i = 0; i < 200; i++) {
    if (!completed) {
      if (current > width) {
        completed = true;
      } else if (next > width) {
        current++;
        next = current + 1;
      } else if (bars[current].len > bars[next].len) {
        [bars[current].len, bars[next].len] = [bars[next].len, bars[current].len];
        next++;
      } else {
        next++;
      }
      if (current <= width && next <= width) {
        bars[next].highlightRed(height);
      }
    }
  }
  for (let i = 0; i < 5; i++) {
    if (completed && completeHighlight < width) {
      bars[completeHighlight].complete = true;
      completeHighlight++;
    }
  }
}

function bar(x, len) {
  this.x = x;
  this.len = len;
  this.complete = false;

  this.show = function(y) {
    stroke(255);
    if (this.complete) {
      stroke(0, 255, 0);
    }
    line(this.x, y, this.x, y - this.len);
  }

  this.highlightRed = function(y) {
    stroke(255, 0, 0);
    line(this.x, y, this.x, y - this.len);
  }
}
