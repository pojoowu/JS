function CellC(i, j, w) {
  this.w = w;
  this.i = i;
  this.j = j;
  this.state = 0; //false == die; true == alive

  this.show = function() {
    let x = this.j * w;
    let y = this.i * w;
    noFill();
    stroke(0);
    rect(x, y, w, w);
    if (this.state) {
      fill(255);
      rect(x, y, w, w);
    }
  }

  this.renewConway = function() {
    let count = 0;
    for (let ni = -1; ni < 2; ni++) {
      for (let nj = -1; nj < 2; nj++) {
        if (ni != 0 || nj != 0) {
          if (cells[index(this.i + ni, this.j + nj, rownb, colnb)].state) {
            count += 1;
          }
        }
      }
    }
    if (this.state) {
      if (count < 2 || count > 3) {
        return 0;
      } else {
        return 1;
      }
    } else {
      if (count === 3) {
        return 1;
      } else {
        return 0;
      }
    }
  }
}
