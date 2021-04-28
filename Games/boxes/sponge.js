//last update : 08/04/2021
let sponges = [];
let canvas, button, slider;

function setup() {
  canvas = createCanvas(600, 600, WEBGL);
  button = select('#generate');
  let s = new sponge(0, 0, 0, 250, 1);
  slider = createSlider(1, 5, 1, 0);
  sponges.push(s);
  canvas.parent('canvasP');
  slider.parent('slider');
}

function draw() {
  background(51);
  lights();
  let rotateSpeed = slider.value();
  rotateX(frameCount * 0.01 * rotateSpeed);
  rotateY(frameCount * 0.02 * rotateSpeed);
  for (s of sponges) {
    s.show();
  }
  button.mousePressed(nextGeneration);
}

function nextGeneration() {
  for (let i = sponges.length - 1; i >= 0; i--) {
    let s = sponges.splice(i, 1);
    if (s[0].exist) {
      s[0].renew(sponges);
    }
  }
}

function sponge(x, y, z, r, generation) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.size = r;
  this.exist = true;
  this.generation = generation;

  this.show = function() {
    noStroke();
    if (this.exist) {
      translate(x, y, z);
      fill(generation * 50, 0, generation * 25);
      box(r);
      translate(-x, -y, -z);
    }
  }

  this.renew = function(arr) {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        for (let k = -1; k < 2; k++) {
          let s = new sponge(this.x + i * this.size / 3, this.y + j * this.size / 3, this.z + k * this.size / 3, this.size / 3, this.generation + 1);
          let val = abs(i) + abs(j) + abs(k);
          if (val >= 2) {
            arr.push(s);
          }
        }
      }
    }
    this.exist = false;
  }
}
