function CellB(i, j, w){
  this.w = w;
  this.i = i;
  this.j = j;
  this.state = 0; //false == die; true == alive
  let on = 1;
  let dying = 2;
  let off = 0;

  this.show = function() {
    let x = this.j * w;
    let y = this.i * w;
    noFill();
    stroke(0);
    rect(x, y, w, w);
    if (this.state === on) {
      fill(255);
      rect(x, y, w, w);
    }else if(this.state === dying){
      fill(0, 0, 255);
      rect(x, y, w, w);
    }
  }

  this.renewB = function() {
    let count = 0;
    for (let ni = -1; ni < 2; ni++) {
      for (let nj = -1; nj < 2; nj++) {
        if (ni != 0 || nj != 0) {
          if (cells[index(this.i + ni, this.j + nj, rownb, colnb)].state === on) {
            count += 1;
          }
        }
      }
    }
    if (this.state === on) {
      return dying;
    } else if(this.state === dying){
      return off;
    } else{
      if(count === 2){
        return on;
      }else{
        return off;
      }
    }
  }
}
