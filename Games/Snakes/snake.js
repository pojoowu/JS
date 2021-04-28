let canvas, button_restart;
let w = 10;
let m = 2;
let s, food, speed;
let acc = false;




function setup() {
  canvas = createCanvas(600, 600);
  button_restart = select("#restart");
  canvas.parent('#canvasP');
  frameRate(10);
  let foodX = floor(random(m, width / w));
  let foodY = floor(random(m, height / w));
  s = new snake(floor(width / (2 * w)), floor(height / (2 * w)));
  food = createVector(foodX, foodY);
  speed = 1;
}

function draw() {
  background(51);
  frameRate(15 + floor(speed / 5));
  button_restart.mousePressed(restart);
  if (!s.gameOver()) {
    noStroke();
    fill(255, 0, 0);
    rect(food.x * w, food.y * w, w, w);
    s.show(w);
    //if the snake eats a food then it grows by one and gain some acc Capacity
    if (s.eat(food)) {
      let v = createVector(s.body[0].x, s.body[0].y);
      s.grow(v);
      food = findLocation(s.body).copy();
      speed++;
      s.accCapacity += 1;
      s.accCapacity = constrain(s.accCapacity, 0, 10);
    }

    s.move();

    //if accerlerating the snake moves one more time
    if (acc && s.accCapacity > 0) {
      if (s.eat(food)) {
        let v = createVector(s.body[0].x, s.body[0].y);
        s.grow(v);
        food = findLocation(s.body).copy();
        speed++;
        s.accCapacity += 1;
        s.accCapacity = constrain(s.accCapacity, 0, 10);
      }
      s.move();
      s.accCapacity -= 0.1;
      s.accCapacity = constrain(s.accCapacity, 0, 10);
    }
    s.accCapacity += 0.01;
    s.accCapacity = constrain(s.accCapacity, 0, 10);
    //acc Capacity bar
    stroke(0);
    fill(0);
    rect(0, 0, 200, 20);
    fill(255);
    rect(0, 0, s.accCapacity * 20, 20);
    stroke(255);
    line(0, 20, width, 20);
  } else {
    textSize(64);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2 - 32);
    text("Score:" + s.long, width / 2, height / 2 + 32);
  }
}

function restart() {
  let foodX = floor(random(m, width / w));
  let foodY = floor(random(m, height / w));
  s = new snake(floor(width / (2 * w)), floor(height / (2 * w)));
  food = createVector(foodX, foodY);
  speed = 1;
}

function findLocation(arr) {
  let keep_finding = true;
  while (keep_finding) {
    let x = floor(random(m, width / w));
    let y = floor(random(m, height / w));
    let v = createVector(x, y);
    let including = false;
    for (c in arr) {
      if (c.x === x && c.y === y) {
        including = true;
      }
    }
    if (!including) {
      keep_finding = false;
      return v;
    }
  }
}

function keyPressed() {
  if (keyCode === 87) {
    if (s.long === 1 || s.speedY < 1) {
      s.speedX = 0;
      s.speedY = -1;
    }
  } else if (keyCode === 68) {
    if (s.long === 1 || s.speedX > -1) {
      s.speedX = 1;
      s.speedY = 0;
    }
  } else if (keyCode === 83) {
    if (s.long === 1 || s.speedY > -1) {
      s.speedX = 0;
      s.speedY = 1;
    }
  } else if (keyCode === 65) {
    if (s.long === 1 || s.speedX < 1) {
      s.speedX = -1;
      s.speedY = 0;
    }
  }
  if (keyCode === ENTER) {
    acc = true;
  }
}

function keyReleased() {
  if (keyCode === ENTER) {
    acc = false;
  }
}

function edge(x, y) {
  return (x < 0 || x > floor(width / w) - 1 || y < m || y > floor(height / w) - 1);
}

function eatingBody(arr) {
  for (let j = 1; j < arr.length; j++) {
    if (arr[0].x === arr[j].x && arr[0].y === arr[j].y) {
      return true;
    }
  }
  return false;
}

function snake(x, y) {
  this.speedX = 1;
  this.speedY = 0;
  this.long = 1;
  this.body = [];
  this.body[0] = createVector(x, y);
  this.accCapacity = 5;

  this.show = function(w) {
    for (pos of this.body) {
      fill(255);
      rect(pos.x * w, pos.y * w, w, w);
    }
  }

  this.move = function() {
    let head = this.body[0];
    let pos = this.body.pop();
    pos.x = head.x + this.speedX;
    pos.y = head.y + this.speedY;
    this.body.unshift(pos);
  }

  this.eat = function(pos) {
    let d = dist(this.body[0].x, this.body[0].y, pos.x, pos.y);
    if (d < 1) {
      this.long++;
      return true;
    } else {
      return false;
    }
  }

  this.grow = function(pos) {
    let x = this.body[0].x + this.speedX;
    let y = this.body[0].y + this.speedY;
    let v = createVector(x, y);
    this.body.unshift(v);
  }

  this.gameOver = function() {
    if (edge(this.body[0].x, this.body[0].y) || eatingBody(this.body)) {
      return true;
    } else {
      return false;
    }
  }

}
