function CellS(i, j, w) {
  this.w = w;
  this.i = i;
  this.j = j;
  this.state = 0; //false == die; true == alive
  let off = 0;
  let on = 1;
  let dyingSoon = 2;
  let dying = 3;
  let dead = 4;

  this.show = function() {
    let x = this.j * w;
    let y = this.i * w;
    noFill();
    stroke(0);
    if (this.state === on) {
      fill(255, 255, 0);
    } else if (this.state === dyingSoon) {
      fill(255, 128, 0);
    } else if (this.state === dying) {
      fill(255, 0, 0);
    } else if (this.state === dead) {
      fill(51, 25, 0);
    }
    rect(x, y, w, w);
  }

  this.renewS = function() {
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
      if (count < 3 || count > 5) {
        return dyingSoon;
      } else {
        return on;
      }
    } else if (this.state === dyingSoon) {
      return dying;
    } else if (this.state === dying) {
      return dead;
    } else if(this.state === dead){
      if(count === 2){
        return on;
      }else{
        return dead;
      }
    } else{
      if(count === 2){
        return on;
      }else{
        return off;
      }
    }
  }
}
