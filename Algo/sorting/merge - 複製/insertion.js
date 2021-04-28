//last update : 08/04/2021

let bars = [];
let current = 0;
let next = 0;
let just_treating = 0;
let completeHighlight = 0;
let completed = false;

function setup() {
  createCanvas(600, 400);
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

  quickSort(bars, 0, width);
}

function quickSort(arr, i, j) {
  if (j - i >= 2) {
    let pivot = arr[i];
    let pos = i;
    for (let k = i + 1; k < j; k++) {
      if (arr[k] < pivot) {
        [arr[k], arr[pos]] = [arr[pos], arr[k]];
        pos += 1;
        [arr[k], arr[pos]] = [arr[pos], arr[k]];
      }
    }
    quickSort(arr, i, pos);
    quickSort(arr, pos+1, j);
  }else{
    if(arr[i]>arr[j]){
      [arr[i], arr[j]] = [arr[i], arr[j]];
    }
  }
}
