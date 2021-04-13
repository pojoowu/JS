function randomShuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let d = Math.floor(Math.random()*(i + 1));
    [arr[i], arr[d]] = [arr[d], arr[i]];
  }
}
function swap(a, b){

}

function index(i, j, rows, cols){
  if(i<0){
    i = rows+i;
  }
  if(i > rownb-1){
    i = i-rows;
  }
  if(j<0){
    j = cols+j;
  }
  if(j > colnb-1){
    j = j-cols;
  }
  return i*cols+j;
}
