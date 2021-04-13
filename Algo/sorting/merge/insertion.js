//last update : 08/04/2021

let bars = [];
let current = 0;
let next = 0;
let just_treating = 0;
let completeHighlight = 0;
let completed = false;

function setup() {
  createCanvas(1000, 800);
  for (let i = 0; i <= width; i++) {
    bars.push(i * height / width);
  }
  randomShuffleArray(bars);
  frameRate(10);
}

function draw() {
  background(51);
  for (let i = 0; i <= width; i++) {
    stroke(255);
    line(i, height, i, height - bars[i]);
  }

  divideArr(bars, 0, width);
}

function mergeArr(arr, i1, j1, i2, j2) {
  if (i1 > i2) {
    [i1, i2] = [i2, i1];
    [j1, j2] = [j2, j1];
  }
  while (i1 <= j1) {
    if (arr[i1] > arr[i2]) {
      [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
    }
    i1++;
  }
}

function divideArr(arr, i, j) {
  if (j - i <= 1) {
    mergeArr(arr, i, i, j, j);
  } else {
    let m = floor((i + j) / 2);
    divideArr(arr, i, m);
    divideArr(arr, m, j);
    mergeArr(arr, i, m, m, j);
  }
}
