//Circle Packing : https://en.wikipedia.org/wiki/Circle_packing
let bubbles = [];
let current;
let inSomeone = false;
let canvas, button, slider;
let stopping = false;

function setup() {
  canvas = createCanvas(800, 600);
  button = select('#stopping');
  slider = select('#growingSpeed');
  let x = random(0, width);
  let y = random(0, height);
  let c = new bubble(x, y);
  current = c;
  canvas.parent('#canvasP');
}

function draw() {
  background(51);
  button.mousePressed(stopDrawing);
  let speed = slider.value();
  if (!stopping) {
    if (!current.growing) {
      bubbles.push(current);
      let x = random(width);
      let y = random(height);
      let c = new bubble(x, y);
      for (let i = 0; i < bubbles.length; i++) {
        let d = dist(x, y, bubbles[i].x, bubbles[i].y);
        if (d < bubbles[i].r) {
          inSomeone = true;
        }
      }
      if (!inSomeone) {
        current = c;
      } else {
        inSomeone = false;
      }
    }
    current.grow(speed);
    if (current.edge()) {
      current.growing = false;
    }
    for (let i = 0; i < bubbles.length; i++) {
      let d = dist(current.x, current.y, bubbles[i].x, bubbles[i].y);
      if (d <= current.r + bubbles[i].r) {
        current.growing = false;
      }
    }
  }
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].show();
  }
  current.show();

}

function stopDrawing(){
  if(stopping){
    stopping = false;
    button.html('Stop!!!');
  }else{
    stopping = true;
    button.html('Start!!!');
  }
}

function bubble(x, y) {
  this.x = x;
  this.y = y;
  this.r = 1;
  this.growing = true;

  this.show = function() {
    stroke(255);
    strokeWeight(2);
    fill(this.r, 0, this.r, 100);
    circle(this.x, this.y, this.r * 2);
  }

  this.grow = function(speed) {
    if (this.growing) {
      this.r = this.r + speed;
    }
  }

  this.edge = function() {
    return (this.r > x || this.r > y || this.r + x > width || this.r + y > height)
  }
}
