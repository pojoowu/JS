//last update : 09/04/2021
let cubes = [];
let total = 200;
let size = 3;

function setup() {
  createCanvas(800, 800, WEBGL);
  let m = floor(size / 2);
  let r = total / size;
  let adjust = ((size + 1) % 2) * 0.5 * r;
  for (let i = -m; i < size - m; i++) {
    for (let j = -m; j < size - m; j++) {
      for (let k = -m; k < size - m; k++) {
        let x = r * i + adjust;
        let y = r * j + adjust;
        let z = r * k + adjust;
        let b = new Cube(x, y, z, r);
        cubes.push(b);
      }
    }
  }
}

function draw() {
  background(51);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.02);
  for (b of cubes) {
    b.show();
  }
}

function Cube(x, y, z, r) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.r = r;

  this.show = function() {
    stroke(0);
    strokeWeight(2);
    translate(this.x, this.y, this.z);
    box(this.r);
    translate(-this.x, -this.y, -this.z);
  }

}
