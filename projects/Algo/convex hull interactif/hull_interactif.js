//last update : 08/04/2021

let nb = 100;
let points = [];
let r = 10;
let upperHull = [];
let lowerHull = [];
let current = 0; //the index of the point treating
let starting = false;
let stopping = false;
let just_renew = true;
let canvas, button1, button2, slider;

function setup() {
  canvas = createCanvas(800, 800);
  button1 = select('#stopping');
  button2 = select('#renew');
  slider = select('#frameRate');
  for (let i = 0; i < nb; i++) {
    let corx = random(width * 0.2, width * 0.8);
    let cory = random(height * 0.2, height * 0.8);
    let v = createVector(corx, cory);
    points.push(v);
  }
  canvas.parent('#canvasP');
  frameRate(slider.value());
}

function mousePressed() {
  if (!starting) {
    if (mouseX < width && mouseY < height && 0 < mouseX && 0 < mouseY) {
      let pt = createVector(mouseX, mouseY);
      points.push(pt);
      nb++;
    }
  }
}

function draw() {
  background(51);
  button1.mousePressed(stopDrawing);
  button2.mousePressed(renew);
  frameRate(slider.value());
  for (let i = 0; i < nb; i++) {
    show(points[i]);
  }
  if (upperHull.length > 1) {
    for (let i = 0; i < upperHull.length - 1; i++) {
      connect(upperHull[i], upperHull[i + 1]);
    }
  }
  if (lowerHull.length > 1) {
    for (let i = 0; i < lowerHull.length - 1; i++) {
      connect(lowerHull[i], lowerHull[i + 1]);
    }
  }
  if (starting && !stopping) {
    if (current < nb) {
      highlight(points[current]);
      let ul = upperHull.length;
      if (ul > 1 && turning(upperHull[ul - 2], upperHull[ul - 1], points[current]) === 1) {
        highlightLine(upperHull[ul - 2], upperHull[ul - 1]);
        highlightLine(upperHull[ul - 1], points[current]);
        upperHull.pop();
      } else {
        upperHull.push(points[current]);
        current += 1;
      }
    } else if (current >= nb && current < 2 * nb - 1) {
      let c = current - nb + 1;
      highlight(points[c]);
      let ll = lowerHull.length;
      if (ll > 1 && turning(lowerHull[ll - 2], lowerHull[ll - 1], points[c]) === -1) {
        highlightLine(lowerHull[ll - 2], lowerHull[ll - 1]);
        highlightLine(lowerHull[ll - 1], points[c]);
        lowerHull.pop();
      } else {
        lowerHull.push(points[c]);
        current += 1;
      }
    }
  }
}

function stopDrawing() {
  if (!starting) {
    for (let i = 1; i < nb; i++) { //Sort the array with lexicographic order
      let t = points[i].copy();
      let j = i - 1;
      while (j >= 0 && (t.x < points[j].x || ((t.x === points[j].x) && (t.y < points[j].y)))) {
        points[j + 1] = points[j].copy();
        j--;
      }
      points[j + 1] = t.copy();
    }
    upperHull.push(points[0]);
    lowerHull.push(points[0]);
    starting = true;
    stopping = true;
  }
  if (!stopping) {
    stopping = true;
    button1.html('Start!!');
  } else {
    stopping = false;
    button1.html('Stop!!');
  }
}

function renew() {
  points = [];
  upperHull = [];
  lowerHull = [];
  current = 0;
  starting = false;
  just_renew = true;
  nb = 100;
  for (let i = 0; i < nb; i++) {
    let corx = random(width * 0.2, width * 0.8);
    let cory = random(height * 0.2, height * 0.8);
    let v = createVector(corx, cory);
    points.push(v);
  }
}

function show(v) {
  noStroke();
  fill(255);
  circle(v.x, v.y, r);
}

function connect(a, b) {
  stroke(255);
  line(a.x, a.y, b.x, b.y);
}

function highlight(a) {
  noStroke();
  fill(255, 0, 0);
  circle(a.x, a.y, r);
}

function highlightLine(a, b) {
  stroke(255, 0, 0);
  line(a.x, a.y, b.x, b.y);
}

function turning(a, b, c) {
  let v1 = p5.Vector.sub(b, a);
  let v2 = p5.Vector.sub(c, b);
  let r = v2.x * v1.y - v2.y * v1.x;
  if (r > 0) {
    return 1;
  } else {
    return -1;
  }
}
